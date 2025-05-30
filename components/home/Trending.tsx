import React from 'react'
import BookCard from './BookCard'

interface Props {
    title: string;
    books: Book[];
}

const Trending = ({ 
    title, 
    books 
}: Props) => {
    if (books.length < 2) {
        return;
    }

    return (
        <div className='relative flex flex-col justify-center items-center w-full my-40 px-10'>
            <h1 className='z-20 paytone-one-regular text-3xl md:text-4xl text-center bg-gradient-to-r from-[#EAB139] to-[#E78B48] text-transparent bg-clip-text uppercase'>{title}</h1>
            <span className='mt-2 max-w-4xl text-center text-gray-300 leading-relaxed px-4 md:px-0'>Discover the freshest arrivals and hottest books making waves right now!</span>

            {/* List of trending books */}
            <ul className='flex flex-wrap justify-center gap-8 mt-8'>
                {books.map((book) => (
                    <BookCard key={book.title} {...book}/>
                ))}
            </ul>
        </div>
    )
}

export default Trending