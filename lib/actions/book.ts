"use server"

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

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

    } catch (error) {
        console.log(error);

        return {
            success: false,
            error: "An error occured while borrowing the book."
        }
    }
}