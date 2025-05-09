'use client'

import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div className='w-full h-min-screen'>
            <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
                <div className='bg-white rounded-2xl p-5 w-full shadow-sm'>
                    <p className='text-black text-lg font-medium'>Books Dashboard</p>
                </div>
            </div>

            <div className='bg-white relative min-h-[400px] rounded-2xl p-4'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
                    <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'>
                        A - Z
                    </button>

                    <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium gap-2 px-6 rounded-lg transition hover:bg-[#d99e2e]'>
                        <Link href='/admin/books/new'>
                            + Create a New Book
                        </Link>
                    </button>
                </div>

                {/* Table header */}
                <div className='w-full overflow-hidden bg-[#8196AE] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center'>
                    <h2 className='text-black text-sm sm:text-base'>Book Title</h2>
                    <h2 className='text-black text-sm sm:text-base'>Author</h2>
                    <h2 className='text-black text-sm sm:text-base'>Genre</h2>
                    <h2 className='text-black text-sm sm:text-base'>Date Created</h2>
                    <h2 className='text-black text-sm sm:text-base'>Action</h2>
                </div>
            </div>
        </div>  
    )
}

export default Page