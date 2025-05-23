import React from 'react'
import BookCard from './BookCard'

interface Props {
    title: string;
    books: Book[];
}

const Trending = ({ title, books }: Props) => {
    return (
        <div className='relative flex flex-col justify-center items-center w-full my-40 px-10'>
            <h1 className='z-20 paytone-one-regular uppercase text-3xl text-[#EAB139] shadow-md'>{title}</h1>

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