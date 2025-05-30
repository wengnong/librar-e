"use server"

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
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