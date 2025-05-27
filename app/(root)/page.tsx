import { auth } from "@/auth"
import About from "@/components/home/About"
import Featured from "@/components/home/Featured"
import Header from "@/components/home/Header"
import ReaderChoice from "@/components/home/ReaderChoice"
import Review from "@/components/home/Review"
import Trending from "@/components/home/Trending"

import { db } from "@/database/drizzle"
import { books, users } from "@/database/schema"
import { getLatestTrending, getReadersChoice } from "@/lib/bookFilter"
import { desc } from "drizzle-orm"

const Home = async () => {
    const allBooks = (await db
        .select()
        .from(books)
        .orderBy(desc(books.createdAt))
    ).map(book => ({
        ...book,
        rating: Number(book.rating),
    })) as Book[]

    const trendingBooks = getLatestTrending(allBooks)
    const readersChoiceBooks = getReadersChoice(allBooks)
    
    const result = await db.select().from(users);
    console.log(JSON.stringify(result, null, 2));

    return (
        <>
            <div className='relative'>
                <Header />
                <Featured
                    {...allBooks[0]}
                />
                <Trending
                    title="Latest Trending"
                    books={trendingBooks}
                />
                <ReaderChoice 
                    title="Most Reader's Choice"
                    books={readersChoiceBooks}
                />
                <About />
                <Review />
            </div>
        </>
    )
}

export default Home
