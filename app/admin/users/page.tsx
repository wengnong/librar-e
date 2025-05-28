'use client'

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
                </div>

                {/* Table header */}
                <div className='w-full overflow-hidden bg-[#8196AE] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center'>
                    <h2 className='text-black text-sm sm:text-base'>Username</h2>
                    <h2 className='text-black text-sm sm:text-base'>Email</h2>
                    <h2 className='text-black text-sm sm:text-base'>Role</h2>
                    <h2 className='text-black text-sm sm:text-base'>Last Activity Date</h2>
                    <h2 className='text-black text-sm sm:text-base'>Created At</h2>
                </div>
            </div>
        </div>  
    )
}

export default Page