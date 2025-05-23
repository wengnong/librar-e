import About from "@/components/home/About"
import Featured from "@/components/home/Featured"
import Header from "@/components/home/Header"
import ReaderChoice from "@/components/home/ReaderChoice"
import Review from "@/components/home/Review"
import Trending from "@/components/home/Trending"

import { sampleBooks } from "@/constants"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"

const Home = async () => {
    const result = await db.select().from(users);
    console.log(JSON.stringify(result, null, 2));

    return (
        <>
            <div className='relative'>
                <Header />
                <Featured
                    title={sampleBooks[0].title} 
                    author={sampleBooks[0].author} 
                    year={sampleBooks[0].year}
                    description={sampleBooks[0].description} 
                    cover={sampleBooks[0].cover} 
                />
                <Trending
                    title="Latest Trending"
                    books={sampleBooks}
                />
                <ReaderChoice 
                    title="Most Reader&apos;s Choice"
                    books={sampleBooks}
                />
                <About />
                <Review />
            </div>
        </>
    )
}

export default Home