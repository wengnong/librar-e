"use server"

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, or, ilike, desc } from "drizzle-orm";
import { revalidatePath } from 'next/cache'
import dayjs from "dayjs";

type BookInput = {
    title: string
    description: string
    year: number
    author: string
    genre: string
    rating: number
    coverUrl: string
    fileUrl: string
}

export const borrowBook = async (params: BorrowBookParams) => {
    const { userId, bookId } = params;

    try {
        const book = await db
            .select()
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        if (!book.length) {
            return {
                success: false,
                error: "Book cannot be borrowed."
            }
        }

        const dueDate = dayjs().add(14, 'day').toDate().toDateString();
        // if want to test the locked option when the return date is overdue
        // const dueDate = dayjs().subtract(1, 'day').toDate().toDateString();

        const [record] = await db.insert(borrowRecords).values({
            userId,
            bookId,
            dueDate,
            status: "BORROWED",
        }).returning();

        return {
            success: true,
            data: record,
        }
    } catch (error) {
        console.log(error);

        return {
            success: false,
            error: "An error occured while borrowing the book."
        }
    }
}

export const returnBook = async (borrowRecordId: string) => {
    try {
        const [updatedRecord] = await db
            .update(borrowRecords)
            .set({
                status: "RETURNED",
                returnDate: dayjs().toDate().toDateString(),
            })
            .where(eq(borrowRecords.id, borrowRecordId))
            .returning();

        if (!updatedRecord) {
            return {
                success: false,
                error: "Borrow record not found."
            }
        }

        return {
            success: true,
            data: updatedRecord,
        }
    } catch (error) {
        console.log(error);

        return {
            success: false,
            error: "An error occurred while returning the book."
        }
    }
}

export const getAllBooks = async () => {
    try {
        const result = await db.select().from(books).orderBy(desc(books.createdAt))
        return result
    } catch (error) {
        console.error('Error fetching books:', error)
        return []
    }
}

export const getBookById = async (id: string) => {
    try {
        const [book] = await db
            .select()
            .from(books)
            .where(eq(books.id, id))
            .limit(1);
        
        return book || null
    } catch (error) {
        console.error('Error fetching book:', error)
        return null
    }
}

export const createBook = async (data: BookInput) => {
    try {
        const [book] = await db
            .insert(books)
            .values({
                title: data.title,
                description: data.description,
                year: data.year,
                author: data.author,
                genre: data.genre,
                rating: data.rating,
                coverUrl: data.coverUrl,
                fileUrl: data.fileUrl,
                createdAt: new Date(),
            })
            .returning();
        
        revalidatePath('/admin/books')
        return {
            success: true,
            data: book,
        }
    } catch (error) {
        console.error('Error creating book:', error)
        return {
            success: false,
            error: "Failed to create book"
        }
    }
}

export const updateBook = async (id: string, data: BookInput) => {
    try {
        const [book] = await db
            .update(books)
            .set({
                title: data.title,
                description: data.description,
                year: data.year,
                author: data.author,
                genre: data.genre,
                rating: data.rating,
                coverUrl: data.coverUrl,
                fileUrl: data.fileUrl,
                updatedAt: new Date(),
            })
            .where(eq(books.id, id))
            .returning();
        
        if (!book) {
            return {
                success: false,
                error: "Book not found"
            }
        }
        
        revalidatePath('/admin/books')
        revalidatePath(`/admin/books/edit/${id}`)
        revalidatePath(`/books/${id}`)
        
        return {
            success: true,
            data: book,
        }
    } catch (error) {
        console.error('Error updating book:', error)
        return {
            success: false,
            error: "Failed to update book"
        }
    }
}

export const deleteBook = async (id: string) => {
    try {
        const [deletedBook] = await db
            .delete(books)
            .where(eq(books.id, id))
            .returning();
        
        if (!deletedBook) {
            return {
                success: false,
                error: "Book not found"
            }
        }
        
        revalidatePath('/admin/books')
        return {
            success: true,
            data: deletedBook,
        }
    } catch (error) {
        console.error('Error deleting book:', error)
        return {
            success: false,
            error: "Failed to delete book"
        }
    }
}

export const searchBooks = async (query: string) => {
    try {
        const result = await db
            .select()
            .from(books)
            .where(
                or(
                    ilike(books.title, `%${query}%`),
                    ilike(books.author, `%${query}%`),
                    ilike(books.genre, `%${query}%`),
                    ilike(books.description, `%${query}%`)
                )
            )
            .orderBy(desc(books.createdAt));
        
        return result
    } catch (error) {
        console.error('Error searching books:', error)
        return []
    }
}