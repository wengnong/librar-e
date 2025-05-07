import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
    return (
        <div className='pt-3.5'>
            <div className='bg-white relative h-150 rounded-2xl p-4'>

                <div className='absolute top-4 right-4 flex gap-2'>
                <button className='bg-[#DC8E4F] text-black text-xl px-4 py-1 rounded-full'>
                    A - Z
                </button>
                <button className='bg-[#DC8E4F] text-black text-xl px-4 py-1 rounded-full flex items-center gap-2'>
                    <span className='text-lg'>+</span> Create a New Book
                </button>
                </div>

            
                <div className='flex justify-center'>
                <h2 className='text-black text-3xl'>All Books</h2>
                </div>

                <div className='bg-[#8196AE] flex justify-between items-center h-15 px-6 mt-4 rounded-t-lg'>
                <h2 className='text-black'>Book Title</h2>
                <h2 className='text-black'>Author</h2>
                <h2 className='text-black'>Genre</h2>
                <h2 className='text-black'>Date Created</h2>
                <h2 className='text-black'>Action</h2>
                </div>

            </div>
        </div>  
    )
}

export default page