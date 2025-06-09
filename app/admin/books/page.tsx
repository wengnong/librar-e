'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllBooks } from '@/lib/actions/book' // Adjust path as needed

type Book = {
  id: string
  title: string
  author: string
  genre: string
  createdAt: Date | null
}

const Page = () => {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks()
      setBooks(data)
    }

    fetchBooks()
  }, [])

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      {/* Date + Book Count Header */}
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 w-full shadow-sm">
          <p className="text-black text-lg font-medium">Books Dashboard</p>
          <p className="text-gray-600 text-sm mt-1">Total Books: {books.length}</p>
        </div>
      </div>

      {/* Book Table */}
      <div className="bg-white relative min-h-[400px] rounded-2xl p-4">
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
            <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'>
                Add New Books +
            </button>
        </div>
        {/* Table header */}
        <div className="w-full overflow-hidden bg-[#8196AE] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center">
          <h2 className="text-black text-sm sm:text-base">Book Title</h2>
          <h2 className="text-black text-sm sm:text-base">Author</h2>
          <h2 className="text-black text-sm sm:text-base">Genre</h2>
          <h2 className="text-black text-sm sm:text-base">Created At</h2>
          {/* <h2 className="text-black text-sm sm:text-base">Action</h2> */}
        </div>

        {/* Book rows */}
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`grid grid-cols-2 sm:grid-cols-5 items-center text-center px-6 py-4 text-sm ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <p className="text-black truncate">{book.title}</p>
            <p className="text-black">{book.author}</p>
            <p>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                {book.genre}
              </span>
            </p>
            <p className="text-black">
              {book.createdAt
                ? new Date(book.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—'}
            </p>
            {/* <div>
              <Link href={`/admin/books/${book.id}`} className="text-black hover:underline">
                View
              </Link>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
