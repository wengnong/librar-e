import React from "react";
import Link from "next/link";
import Image from "next/image";
import BookCover from "./BookCover";
import { Button } from "../ui/button";

const BookCard = ({ id, title, author, rating, coverUrl }: Book) => {
    // Star rating system
    const star = rating > 4 ? '/icons/fourhalf-rating.png' : '/icons/threehalf-rating.png';

    return (
        <li className='w-[10rem] flex flex-row justify-center'>
            <Link href={`/books/${id}`} className='group relative flex flex-col items-center w-full hover:scale-105 duration-150 transition-all'>
                <Button className='absolute top-1/2 -translate-y-12 z-10 opacity-0 group-hover:opacity-100 bg-yellow-500 cursor-pointer hover:scale-115 transition-all duration-300 font-bold paytone-one-regular'>
                    DETAILS
                </Button>

                {/* Book cover */}
                <BookCover 
                    coverImage={coverUrl}
                    className='object-cover w-[10rem] h-[16rem] shadow-lg rounded-[10px] group-hover:brightness-50 group-hover:blur-[2px] group-hover:rotate-4 duration-150 transition-all'
                />

                {/* Book title and book author */}
                <p className='w-3/4 text-center truncate'>{title}</p>
                <p className='w-3/4 text-center text-[#E78B48] truncate'>{author}</p>

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