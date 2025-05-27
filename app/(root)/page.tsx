import { auth } from "@/auth"
import About from "@/components/home/About"
import Featured from "@/components/home/Featured"
import Header from "@/components/home/Header"
import ReaderChoice from "@/components/home/ReaderChoice"
import Review from "@/components/home/Review"
import Trending from "@/components/home/Trending"

import { db } from "@/database/drizzle"
import { books, users } from "@/database/schema"
import { desc } from "drizzle-orm"

const Home = async () => {
    const session = await auth();

    const latestBooks = (await db
        .select()
        .from(books)
        .limit(7)
        .orderBy(desc(books.createdAt)))
        .map(book => ({
            ...book,
            rating: Number(book.rating)
        })) as Book[];

    const result = await db.select().from(users);
    console.log(JSON.stringify(result, null, 2));

    return (
        <>
            <div className='relative'>
                <Header />
                <Featured
                    {...latestBooks[0]}
                    userId={session?.user?.id as string}
                />
                <Trending
                    title="Latest Trending"
                    books={latestBooks.slice(1)}
                />
                <ReaderChoice 
                    title="Most Reader&apos;s Choice"
                    books={latestBooks.slice(1)}
                />
                <About />
                <Review />
            </div>
        </>
    )
}

export default Home