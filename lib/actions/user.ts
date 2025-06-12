"use server"

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { users } from "@/database/schema";
import { eq, and, desc } from "drizzle-orm";

export const getUserBorrowedBooks = async (userId: string) => {
    try {
        const borrowedBooks = await db
            .select({
                id: borrowRecords.id,
                bookId: books.id,
                title: books.title,
                author: books.author,
                genre: books.genre,
                coverUrl: books.coverUrl,
                fileUrl: books.fileUrl,
                dueDate: borrowRecords.dueDate,
                status: borrowRecords.status,
                borrowedAt: borrowRecords.borrowDate,
            })
            .from(borrowRecords)
            .innerJoin(books, eq(borrowRecords.bookId, books.id))
            .where(
                and(
                    eq(borrowRecords.userId, userId),
                    eq(borrowRecords.status, "BORROWED")
                )
            )
            .orderBy(desc(borrowRecords.borrowDate)); 

        return {
            success: true,
            data: borrowedBooks
        };
    } catch (error) {
        console.log("Error fetching borrowed books:", error);
        return {
            success: false,
            error: "Failed to fetch borrowed books"
        };
    }
};

export const getUserBorrowHistory = async (userId: string) => {
    try {
        const borrowHistory = await db
            .select({
                id: borrowRecords.id,
                bookId: books.id,
                title: books.title,
                author: books.author,
                genre: books.genre,
                coverUrl: books.coverUrl,
                fileUrl: books.fileUrl,
                dueDate: borrowRecords.dueDate,
                status: borrowRecords.status,
                borrowedAt: borrowRecords.borrowDate,
                returnedAt: borrowRecords.returnDate,
            })
            .from(borrowRecords)
            .innerJoin(books, eq(borrowRecords.bookId, books.id))
            .where(eq(borrowRecords.userId, userId))
            .orderBy(desc(borrowRecords.borrowDate));

        return {
            success: true,
            data: borrowHistory
        };
    } catch (error) {
        console.log("Error fetching borrow history:", error);
        return {
            success: false,
            error: "Failed to fetch borrow history"
        };
    }
};

export const getAllUsers = async () => {
    try {
        const allUsers = await db
            .select({
                id: users.id,
                name: users.username,
                email: users.email,
                role: users.role,
                createdAt: users.createdAt,
                lastActivityDate: users.lastActivityDate,
            })
            .from(users)
            .orderBy(desc(users.createdAt));

        return {
            success: true,
            data: allUsers
        };
    } catch (error) {
        console.log("Error fetching users:", error);
        return {
            success: false,
            error: "Failed to fetch users"
        };
    }
};

export const updateUserRole = async (userId: string, newRole: "USER" | "ADMIN",) => {
    try {
        const updatedUser = await db
            .update(users)
            .set({
                role: newRole as "USER" | "ADMIN",
                lastActivityDate: new Date().toISOString()
            })
            .where(eq(users.id, userId))
            .returning({
                id: users.id,
                name: users.username,
                email: users.email,
                role: users.role,
                createdAt: users.createdAt,
                lastActivityDate: users.lastActivityDate,
            });

        if (updatedUser.length === 0) {
            return {
                success: false,
                error: "User not found"
            };
        }

        return {
            success: true,
            data: updatedUser[0],
            message: "Role updated successfully"
        };
    } catch (error) {
        console.log("Error updating user role:", error);
        return {
            success: false,
            error: "Failed to update user role"
        };
    }
};

export const getAllBorrowedBooks = async () => {
    try {
        const allBorrowedBooks = await db
            .select({
                id: borrowRecords.id,
                userId: borrowRecords.userId,
                userName: users.username,
                bookId: borrowRecords.bookId,
                bookTitle: books.title,
                borrowDate: borrowRecords.borrowDate,
                dueDate: borrowRecords.dueDate,
                status: borrowRecords.status,
            })
            .from(borrowRecords)
            .innerJoin(books, eq(borrowRecords.bookId, books.id))
            .innerJoin(users, eq(borrowRecords.userId, users.id))
            .orderBy(desc(borrowRecords.borrowDate));

        return {
            success: true,
            data: allBorrowedBooks
        };
    } catch (error) {
        console.log("Error fetching all borrowed books:", error);
        return {
            success: false,
            error: "Failed to fetch borrowed books"
        };
    }
};

export const checkUserBookBorrow = async (userId: string, bookId: string) => {
    try {
        const existingBorrow = await db
            .select()
            .from(borrowRecords)
            .where(
                and(
                    eq(borrowRecords.userId, userId),
                    eq(borrowRecords.bookId, bookId),
                    eq(borrowRecords.status, "BORROWED")
                )
            )
            .limit(1);

        return {
            success: true,
            isAlreadyBorrowed: existingBorrow.length > 0,
            data: existingBorrow[0] || null
        };
    } catch (error) {
        console.log("Error checking user book borrow:", error);
        return {
            success: false,
            isAlreadyBorrowed: false,
            error: "Failed to check borrow status"
        };
    }
};

export const deleteUserByNameAndEmail = async (username: string, email: string) => {
    try {
        // First, check if user exists with the provided username and email
        const userToDelete = await db
            .select()
            .from(users)
            .where(
                and(
                    eq(users.username, username),
                    eq(users.email, email)
                )
            )
            .limit(1);

        if (userToDelete.length === 0) {
            return {
                success: false,
                message: 'User not found with the provided username and email'
            };
        }

        const userId = userToDelete[0].id;

        // Delete related borrow records first (foreign key constraint)
        await db
            .delete(borrowRecords)
            .where(eq(borrowRecords.userId, userId));

        // Then delete the user
        const deletedUser = await db
            .delete(users)
            .where(
                and(
                    eq(users.username, username),
                    eq(users.email, email)
                )
            )
            .returning({
                id: users.id,
                username: users.username,
                email: users.email
            });

        if (deletedUser.length === 0) {
            return {
                success: false,
                message: 'Failed to delete user'
            };
        }

        return {
            success: true,
            message: 'User and related records deleted successfully',
            data: deletedUser[0]
        };
    } catch (error) {
        console.error('Delete user error:', error);
        return {
            success: false,
            message: 'Failed to delete user'
        };
    }
};

export const deleteBorrowRecordByUsernameAndBookTitle = async (username: string, bookTitle: string) => {
    try {
        // First, find the user by username
        const user = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

        if (user.length === 0) {
            return {
                success: false,
                message: 'User not found with the provided username'
            };
        }

        // Then, find the book by title
        const book = await db
            .select({ id: books.id })
            .from(books)
            .where(eq(books.title, bookTitle))
            .limit(1);

        if (book.length === 0) {
            return {
                success: false,
                message: 'Book not found with the provided title'
            };
        }

        const userId = user[0].id;
        const bookId = book[0].id;

        // Check if the borrow record exists
        const existingBorrowRecord = await db
            .select()
            .from(borrowRecords)
            .where(
                and(
                    eq(borrowRecords.userId, userId),
                    eq(borrowRecords.bookId, bookId)
                )
            )
            .limit(1);

        if (existingBorrowRecord.length === 0) {
            return {
                success: false,
                message: 'No borrow record found for this user and book combination'
            };
        }

        // Delete the borrow record
        const deletedBorrowRecord = await db
            .delete(borrowRecords)
            .where(
                and(
                    eq(borrowRecords.userId, userId),
                    eq(borrowRecords.bookId, bookId)
                )
            )
            .returning({
                id: borrowRecords.id,
                userId: borrowRecords.userId,
                bookId: borrowRecords.bookId,
                status: borrowRecords.status,
                borrowDate: borrowRecords.borrowDate,
                dueDate: borrowRecords.dueDate
            });

        if (deletedBorrowRecord.length === 0) {
            return {
                success: false,
                message: 'Failed to delete borrow record'
            };
        }

        return {
            success: true,
            message: 'Borrow record deleted successfully',
            data: {
                username,
                bookTitle,
                deletedRecord: deletedBorrowRecord[0]
            }
        };
    } catch (error) {
        console.error('Delete borrow record error:', error);
        return {
            success: false,
            message: 'Failed to delete borrow record'
        };
    }
};