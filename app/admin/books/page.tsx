'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllBooks, deleteBook } from '@/lib/actions/book'

type Book = {
  id: string
  title: string
  author: string
  genre: string
  createdAt: Date | null
}

const Page = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [sortedAZ, setSortedAZ] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks()
      setBooks(data)
    }

    fetchBooks()
  }, [])

  const handleSortAZ = () => {
    const sortedBooks = [...books].sort((a, b) =>
      sortedAZ ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
    )
    setBooks(sortedBooks)
    setSortedAZ(!sortedAZ)
  }

  const handleDeleteClick = (bookId: string) => {
    setDeleteConfirm(bookId)
  }

  const handleDeleteConfirm = async (bookId: string) => {
    setIsDeleting(true)
    try {
      const result = await deleteBook(bookId)
      if (result.success) {
        // Remove book from local state
        setBooks(books.filter(book => book.id !== bookId))
        setDeleteConfirm(null)
      } else {
        alert(result.error || 'Failed to delete book. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting book:', error)
      alert('Failed to delete book. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteConfirm(null)
  }

  const getGenreStyle = (genre: string) => {
    switch (genre.toLowerCase()) {
      case 'classic literature':
        return 'bg-blue-100 text-blue-800'
      case 'fantasy':
        return 'bg-purple-100 text-purple-800'
      case 'gothic fiction':
        return 'bg-gray-200 text-gray-900'
      case 'dystopian fiction':
        return 'bg-red-100 text-red-800'
      case 'literary fiction':
        return 'bg-pink-100 text-pink-800'
      case 'science fiction':
        return 'bg-cyan-100 text-cyan-800'
      case 'horror':
        return 'bg-amber-100 text-amber-800'
      case 'mystery':
        return 'bg-indigo-100 text-indigo-800'
      case 'romance':
        return 'bg-rose-100 text-rose-800'
      case 'adventure':
        return 'bg-green-100 text-green-800'
      case 'non-fiction':
        return 'bg-orange-100 text-orange-800'
      case 'coming of age':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(deleteConfirm)}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
          <button
            onClick={handleSortAZ}
            className='cursor-pointer h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#532ed9] hover:text-white'
          >
            {sortedAZ ? 'Reset' : 'A - Z'}
          </button>
          <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#03e775] cursor-pointer'>
            <Link href="/admin/books/new">
              Add New Book
            </Link>
          </button>
        </div>

        {/* Table header */}
        <div className="w-full overflow-hidden bg-[#8196AE] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center">
          <h2 className="text-black text-sm sm:text-base">Book Title</h2>
          <h2 className="text-black text-sm sm:text-base">Author</h2>
          <h2 className="text-black text-sm sm:text-base">Genre</h2>
          <h2 className="text-black text-sm sm:text-base">Created At</h2>
          <h2 className="text-black text-sm sm:text-base">Actions</h2>
        </div>

        {/* Book rows */}
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`grid grid-cols-2 sm:grid-cols-5 items-center text-center px-6 py-4 text-sm ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className="text-center">
              <p className="text-black font-medium truncate">{book.title}</p>
            </div>
            <p className="text-black">{book.author}</p>
            <p>
              <span className={`${getGenreStyle(book.genre)} px-2 py-0.5 rounded-full text-xs font-medium`}>
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
            <div className="flex gap-1 justify-center">
              <Link 
                href={`/books/${book.id}`} 
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition text-xs font-medium"
              >
                View
              </Link>
              <Link 
                href={`/admin/books/edit/${book.id}`} 
                className="px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition text-xs font-medium"
              >
                Edit
              </Link>
              <button 
                onClick={() => handleDeleteClick(book.id)}
                className="px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition text-xs font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {books.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No books found. <Link href="/admin/books/new" className="text-blue-600 hover:underline">Add your first book</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page