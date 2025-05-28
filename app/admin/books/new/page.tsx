import BookForm from '@/components/admin/forms/BookForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col justify-start w-full min-h-screen'>
            <div className='pb-6'>
                <button className='h-8 flex items-center justify-center bg-[#030C19] text-white text-sm font-medium gap-2 px-6 rounded-lg transition hover:bg-[#ff7300]'>
                    <Link href='/admin/books'>Back to Books</Link>
                </button>
            </div>
            

            <div className='max-w-2xl overflow-hidden bg-[#EAB139] p-8 rounded-xl'>
                <BookForm />
            </div>
        </div>
    )
}

export default page