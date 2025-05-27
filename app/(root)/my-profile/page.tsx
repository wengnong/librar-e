import { signOut } from '@/auth';
import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, getInitials } from '@/lib/utils'
import Link from 'next/link'
import { auth } from '@/auth';
import dayjs from 'dayjs';
import { getUserBorrowedBooks } from '@/lib/actions/user';
import BookCover from '@/components/home/BookCover';

const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    const borrowedBooksResult = userId ? await getUserBorrowedBooks(userId) : null;
    const borrowedBooks = borrowedBooksResult?.success ? borrowedBooksResult.data : [];

    return (
        <div className='w-full min-h-screen'>
            {/* Breadcrumb */}
            <div className='w-full max-w-8xl px-4 md:px-6 xl:px-12 pt-8 pb-4'>
                <nav className='flex items-center space-x-2 text-sm md:text-base'>
                    <Link href="/" className='text-gray-600 hover:text-[#EAB139] transition-colors'>
                        Home
                    </Link>
                    <span className='text-gray-400'>/</span>
                    <span className='text-[#EAB139] font-medium truncate max-w-[200px] md:max-w-none'>
                        My Profile
                    </span>
                </nav>
            </div>

            <div className='flex flex-col md:flex-row justify-center gap-5 mb-6 p-10'>
                {/* Profile card */}
                <div className='bg-[#EAB139] rounded-2xl p-4 sm:p-5 md:p-8 content-center w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 shadow-sm'>
                    <Link href='/my-profile'>
                        <Avatar className='size-20'>
                            <AvatarFallback className='bg-gray-500 text-white text-3xl flex items-center justify-center rounded-full leading-none'>
                                {getInitials(session?.user?.name || 'IN')}
                            </AvatarFallback>
                        </Avatar>
                    </Link>

                    <div className='flex flex-col text-left'> 
                        <p className='text-black text-lg font-medium'>Name: {session?.user?.name || 'Guest'}</p>
                        <p className='text-black text-lg font-medium'>Email: {session?.user?.email || '-'}</p>
                        <p className='text-black text-lg font-medium'>Books Borrowed: {borrowedBooks.length}</p>
                    </div>

                    <div>
                        <form action={async () => {
                            "use server";
                            await signOut();
                        }}>
                            <button className='border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 flex items-center justify-center'>
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Borrowed books grid */}
            <div className="px-4 md:px-10 mb-10">
                <h2 className="text-2xl font-bold text-white mb-6">My Borrowed Books</h2>

                {borrowedBooks.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
                        {borrowedBooks.map((book) => (
                            <div
                                key={book.id}
                                className="w-[14rem] flex flex-col items-center bg-[#030C19] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                            >
                                {book.coverUrl && (
                                    <BookCover
                                        coverImage={book.coverUrl}
                                        className="object-cover w-[10rem] h-[16rem] shadow-lg rounded-[10px]"
                                    />
                                )}

                                <div className="space-y-2 w-full">
                                    <h3 className="mt-2 font-semibold text-md text-[#EAB139] line-clamp-2 uppercase paytone-one-regular">
                                        {book.title}
                                    </h3>
                                    <div className="pt-1 space-y-1 text-xs">
                                        <p className="text-gray-400">
                                            <span className="font-medium">Borrowed:</span>{" "}
                                            {dayjs(book.borrowedAt).format("DD MMM YYYY")}
                                        </p>
                                        <p className="text-red-400">
                                            <span className="font-medium">Due Date:</span>{" "}
                                            {dayjs(book.dueDate).format("DD MMM YYYY")}
                                        </p>

                                        <div className="flex justify-between items-center pt-2">
                                            <span
                                                className={`pointer-events-none px-3 py-2 rounded-full text-[10px] font-medium ${
                                                    dayjs().isAfter(dayjs(book.dueDate))
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {dayjs().isAfter(dayjs(book.dueDate)) ? "OVERDUE" : "ACTIVE"}
                                            </span>

                                            <button className="text-[10px] bg-[#0A2647] text-white px-2 py-2 rounded-md hover:bg-[#040a11] transition-all duration-150 cursor-pointer">
                                                RETURN
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-white mb-4">
                            <svg
                                className="mx-auto h-16 w-16"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No borrowed books</h3>
                        <p className="text-gray-500 mb-4">You haven’t borrowed any books yet.</p>
                        <Link
                            href="/library"
                            className="inline-block bg-[#EAB139] text-[#0A2647] px-6 py-2 rounded-md font-medium hover:bg-[#d4a332] transition-colors"
                        >
                            Browse Books
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page