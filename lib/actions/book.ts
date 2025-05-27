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