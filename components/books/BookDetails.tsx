import Link from 'next/link'
import React from 'react'
import FeaturedBookCover from '../home/FeaturedBookCover'
import Image from 'next/image'
import BorrowBook from './BorrowBook'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'

interface Props extends Book {
    userId: string;
}

const BookDetails = async ({
    id,
    userId,
    title,
    author,
    year,
    genre,
    rating,
    description,
    coverUrl
}: Props) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    const star = rating > 4 ? '/icons/fourhalf-rating.png' : '/icons/threehalf-rating.png'; 

    return (
        <div className='relative flex flex-col justify-start items-center w-full min-h-screen mb-10'>
            {/* Breadcrumb */}
            <div className='w-full max-w-8xl px-4 md:px-6 xl:px-12 pt-8 pb-4'>
                <nav className='flex items-center space-x-2 text-sm md:text-base'>
                    <Link href="/" className='text-gray-600 hover:text-[#EAB139] transition-colors'>
                        Home
                    </Link>
                    <span className='text-gray-400'>/</span>
                    <Link href="/library" className='text-gray-600 hover:text-[#EAB139] transition-colors'>
                        Library
                    </Link>
                    <span className='text-gray-400'>/</span>
                    <span className='text-[#EAB139] font-medium truncate max-w-[200px] md:max-w-none'>
                        {title}
                    </span>
                </nav>
            </div>
            
            <div className='relative mt-6 w-full flex justify-center'>
                <div className='px-4 flex flex-col-reverse xl:flex-row justify-start md:items-center my-8 max-w-7xl gap-16 mx-auto'>
                    {/* Content */}
                    <div className='flex flex-col gap-4 justify-center text-center xl:text-start'>
                        <h1 className='passion-one-black text-5xl md:text-7xl lg:text-8xl uppercase'>{title}</h1>
                        <span className='-mt-4 passion-one-bold text-2xl md:text-4xl text-[#EAB139] uppercase'>{author}</span>
                        <div className='flex flex-col gap-2 text-xl'>
                            <span className='-mt-2 text-[#EAB139]'>Genre : <span className='text-[#FFFFFF]'>{genre}</span></span>
                            <span className='-mt-2 text-[#EAB139]'>Year   : <span className='text-[#FFFFFF]'>{year}</span></span>
                            <span className='-mt-2 text-[#EAB139] block'>
                                Ratings :
                                <span className='text-[#FFFFFF] inline-block align-middle ml-2'>
                                    <Image 
                                        src={star}
                                        alt="Star Rating"
                                        width={5000}
                                        height={0}
                                        className='inline-block align-middle object-contain w-[8rem]'
                                    />
                                    <span className='inline-block align-middle ml-1'>
                                        ({rating})
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div className='flex justify-center xl:justify-start'>
                            <p className='text-justify text-base md:text-xl w-3/4'>{description}</p>
                        </div>

                        {/* Borrow button */}
                        {user &&
                            <BorrowBook bookId={id} userId={userId} />
                        }
                    </div>

                    {/* Book cover */}
                    <div className='flex justify-center md:justify-end items-center flex-1'>
                        <div className='w-[210px] sm:w-[230px] md:w-[320px] xl:w-[420px]'>
                            <FeaturedBookCover 
                                coverImage={coverUrl}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BookDetails