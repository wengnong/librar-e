import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BookCard = ({ id, title, author, rating, cover }: Book) => {
    if (id === 0 || id > 10) {
        return null;
    }

    // Star rating system
    const star = rating > 4 ? '/icons/fourhalf-rating.png' : '/icons/threehalf-rating.png';

    return (
        <li className='w-[10rem] flex flex-row justify-center'>
            <Link href={`/books/${id}`} className='flex flex-col items-center w-full hover:scale-105 duration-150 transition-all'>
                {/* Book cover */}
                <Image 
                    src={cover}
                    alt="Book Cover"
                    width={5000}
                    height={0}
                    className='object-cover w-[10rem] h-[16rem] shadow-lg rounded-[10px] hover:brightness-50 hover:blur-[2px] hover:rotate-4 duration-150 transition-all'
                />

                {/* Book title and book author */}
                <p className='w-3/4 text-center truncate'>{title}</p>
                <p className='w-3/ text-center text-[#E78B48] truncate'>{author}</p>

                {/* Rating (based on star) */}
                <Image 
                    src={star}
                    alt="Star Rating"
                    width={5000}
                    height={0}
                    className='mt-1 object-contain w-[5rem] h-auto'
                />
            </Link>
        </li>
    )
}

export default BookCard