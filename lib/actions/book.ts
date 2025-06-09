"use server"

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

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
    const result = await db.select().from(books)
    return result
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}

