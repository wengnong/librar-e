import LibraryClient from "@/components/library/LibraryClient";
import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { desc } from "drizzle-orm"

const LibraryPage = async () => {
    const allBooks = (await db
        .select()
        .from(books)
        .orderBy(desc(books.createdAt)))
        .map(book => ({
            ...book,
            rating: Number(book.rating)
        })) as Book[];

    return <LibraryClient initialBooks={allBooks} />
}

export default LibraryPage