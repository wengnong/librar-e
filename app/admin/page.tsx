import React from 'react'

const page = () => {
    return (
        <div className='w-full h-min-screen'>
            <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
                <div className='bg-[#041224] rounded-2xl p-5 w-full shadow-sm'>
                    <p className='text-[#EAB139] text-lg font-medium'>
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                </div>
            </div>

            <div className='bg-[#041224] relative min-h-[400px] rounded-2xl p-4'>
                {/* <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
                    <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'>
                        A - Z
                    </button>
                </div> */}

                {/* Table header */}
                <div className='w-full overflow-hidden bg-[#EAB139] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center'>
                    <h2 className='text-black text-sm sm:text-base'>Username</h2>
                    <h2 className='text-black text-sm sm:text-base'>Book(s) borrowed</h2>
                    <h2 className='text-black text-sm sm:text-base'>Latest Borrow Date</h2>
                    <h2 className='text-black text-sm sm:text-base'>Latest Return Date</h2>
                    <h2 className='text-black text-sm sm:text-base'>Created At</h2>
                </div>
            </div>

            {/* Second Table */}
            <div className='bg-[#041224] relative min-h-[400px] rounded-2xl p-4 mt-10'>
                {/* <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
                    <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'>
                        A - Z
                    </button>
                </div> */}
                
                {/* Table header */}
                <div className='w-full overflow-hidden bg-[#EAB139] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center'>
                    <h2 className='text-black text-sm sm:text-base'>Admins</h2>
                    <h2 className='text-black text-sm sm:text-base'>Logged In At</h2>
                    <h2 className='text-black text-sm sm:text-base'>Times Elapsed</h2>
                    <h2 className='text-black text-sm sm:text-base'>Logged Out At</h2>
                    <h2 className='text-black text-sm sm:text-base'>Actions</h2>
                </div>
            </div>
            
        </div>
    )
}

export default page