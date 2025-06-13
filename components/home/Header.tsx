'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Book {
    id: string;
    title: string;
    author?: string;
}

interface HeaderProps {
    books?: Book[];
}

const Header: React.FC<HeaderProps> = ({ books = [] }) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchResults, setSearchResults] = useState<Book[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([])
            setIsSearching(false)
            return
        }

        setIsSearching(true)
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(filteredBooks)
    }, [searchQuery, books])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleBookClick = (bookId: string) => {
        router.push(`/books/${bookId}`)
        setSearchQuery('')
        setSearchResults([])
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchResults.length > 0) {
            handleBookClick(searchResults[0].id)
        }
    }

    return (
        <header className="relative w-full mb-40 md:min-h-screen overflow-hidden">
            <div className='flex flex-col items-center justify-center w-full gap-10'>
                <h1 className='text-white text-3xl mt-20 text-center passion-one-bold'>
                    READ ANYWHERE, EVERYWHERE.
                </h1>

                <div className='z-20 flex justify-center items-center relative w-full'>
                    <div className="absolute bottom-0 z-10 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Image
                                    src="/icons/search.svg"
                                    width={16}
                                    height={16}
                                    alt="Search"
                                    className="w-4 h-4 text-[#EAB139]"
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="What are you looking for today ?"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyPress={handleKeyPress}
                                className="paytone-one-regular text-md py-3 px-8 border-5 border-[#EAB139] text-[#EAB139] rounded-full p-2 w-[70vw] bg-[#FFFFFF] focus:outline-none"
                            />

                            {/* Search dropdown */}
                            {isSearching && searchQuery.trim() !== '' && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#EAB139] rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((book) => (
                                            <div
                                                key={book.id}
                                                onClick={() => handleBookClick(book.id)}
                                                className="p-3 hover:bg-[#EAB139] text-[#EAB139] hover:text-white cursor-pointer border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <h4 className="font-semibold text-sm">
                                                            {book.title}
                                                        </h4>
                                                        {book.author && (
                                                            <p className="text-gray-600 text-xs">
                                                                by {book.author}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-center text-gray-500">
                                            No books found for &quot;{searchQuery}&quot;
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <Image 
                        src="/images/header-books.png"
                        alt="Books"
                        width={3000}
                        height={2000}
                        className='w-[60vw] h-auto z-0'
                    />
                </div>
            </div>

            {/* Background Preset*/}
            <Image
                src="/images/header-bg.svg"
                alt="Background"
                width={1920}
                height={1080}
                className="w-full h-auto absolute top-0 left-0 z-[-10]"
            />
        </header>
    )
}

export default Header