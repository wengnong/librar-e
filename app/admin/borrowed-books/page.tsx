'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getAllBorrowedBooks } from '@/lib/actions/user';

type BorrowedBook = {
    id: string;
    userId: string;
    userName: string;
    bookId: string;
    bookTitle: string;
    borrowDate: Date | string;
    dueDate: Date | string;
    status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
};

const Page = () => {
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
    const [sortedAZ, setSortedAZ] = useState(false);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            const booksResult = await getAllBorrowedBooks();
            if (booksResult?.success) {
                setBorrowedBooks(booksResult.data);
            }
        };

        fetchBorrowedBooks();
    }, []);

    const handleSortAZ = () => {
        setSortedAZ(!sortedAZ);
    };

    const displayedBooks = [...borrowedBooks].sort((a, b) => {
        if (!sortedAZ) return 0;
        return (a.userName || '').localeCompare(b.userName || '');
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'BORROWED':
                return 'bg-blue-100 text-blue-800';
            case 'RETURNED':
                return 'bg-green-100 text-green-800';
            case 'OVERDUE':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className='w-full min-h-screen p-4 md:p-6'>
            <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
                <div className='bg-white rounded-2xl p-5 w-full shadow-sm'>
                    <p className='text-black text-lg font-medium'>Borrowed Books Dashboard</p>
                    <p className='text-gray-600 text-sm mt-1'>Total Records: {borrowedBooks?.length || 0}</p>
                </div>
            </div>

            <div className='bg-white relative min-h-[400px] rounded-2xl p-4'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
                    <button
                        onClick={handleSortAZ}
                        className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'
                    >
                        {sortedAZ ? 'A - Z' : 'Sort A - Z'}
                    </button>
                </div>

                {/* Table header */}
                <div className='w-full overflow-hidden bg-[#8196AE] grid grid-cols-2 sm:grid-cols-6 items-center h-14 px-6 mt-4 rounded-t-lg text-center'>
                    <h2 className='text-black text-sm sm:text-base font-medium'>User</h2>
                    <h2 className='text-black text-sm sm:text-base font-medium'>Book</h2>
                    <h2 className='text-black text-sm sm:text-base font-medium'>Borrow Date</h2>
                    <h2 className='text-black text-sm sm:text-base font-medium'>Due Date</h2>
                    <h2 className='text-black text-sm sm:text-base font-medium'>Status</h2>
                    <h2 className='text-black text-sm sm:text-base font-medium'>Days Left</h2>
                </div>

                {/* Table body */}
                <div className='w-full'>
                    {displayedBooks.length > 0 ? (
                        displayedBooks.map((book, index) => {
                            const daysLeft = dayjs(book.dueDate).diff(dayjs(), 'day');
                            const isOverdue = daysLeft < 0;
                            
                            return (
                                <div
                                    key={book.id || index}
                                    className={`w-full grid grid-cols-2 sm:grid-cols-6 items-center h-16 px-6 text-center border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    }`}
                                >
                                    <p className='text-black text-sm truncate'>{book.userName || 'N/A'}</p>
                                    <p className='text-black text-sm truncate'>{book.bookTitle || 'N/A'}</p>
                                    <p className='text-black text-sm'>
                                        {book.borrowDate
                                            ? dayjs(book.borrowDate).format('DD MMM YYYY')
                                            : 'N/A'}
                                    </p>
                                    <p className='text-black text-sm'>
                                        {book.dueDate
                                            ? dayjs(book.dueDate).format('DD MMM YYYY')
                                            : 'N/A'}
                                    </p>
                                    <div className='flex justify-center'>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
                                            {book.status}
                                        </span>
                                    </div>
                                    <p className={`text-sm font-medium ${
                                        isOverdue ? 'text-red-600' : 
                                        daysLeft <= 3 ? 'text-orange-600' : 'text-green-600'
                                    }`}>
                                        {book.status === 'RETURNED' ? 'Returned' : 
                                            isOverdue ? `${Math.abs(daysLeft)} days overdue` : 
                                            `${daysLeft} days left`}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <div className='w-full h-32 flex items-center justify-center'>
                            <div className='text-center'>
                                <p className='text-gray-500 text-lg mb-2'>No borrowed books found</p>
                                <p className='text-gray-400 text-sm'>There are no borrowed books to display at the moment.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;