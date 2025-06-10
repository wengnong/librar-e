import React from 'react'

const page = () => {
    return (
        <div className='w-full min-h-screen p-4 md:p-6'>
            <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
                <div className='bg-white rounded-2xl p-5 w-full shadow-sm'>
                    <p className="text-black text-lg font-medium">Admin Homepage</p>
                    <p className='text-gray-600 text-sm mt-1'>
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                </div>
            </div>

            <div className='bg-white relative min-h-[400px] rounded-2xl p-4'>
                {/* <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
                    <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'>
                        A - Z
                    </button>
                </div> */}

                {/* Table header */}
                <div className='w-full overflow-hidden bg-[#8196AE] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center'>
                    <h2 className='text-black text-sm sm:text-base'>Username</h2>
                    <h2 className='text-black text-sm sm:text-base'>E-Mail</h2>
                    <h2 className='text-black text-sm sm:text-base'>Latest Borrow Date</h2>
                    <h2 className='text-black text-sm sm:text-base'>Latest Activity</h2>
                    <h2 className='text-black text-sm sm:text-base'>Created At</h2>
                </div>
            </div>

            {/* Second Table */}
            <div className='bg-white relative min-h-[400px] rounded-2xl p-4 mt-10'>
                {/* <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4'>
                    <button className='h-8 flex items-center justify-center bg-[#EAB139] text-black text-sm font-medium px-6 rounded-lg transition hover:bg-[#d99e2e]'>
                        A - Z
                    </button>
                </div> */}
                
                {/* Table header */}
                <div className='w-full overflow-hidden bg-[#8196AE] grid grid-cols-2 sm:grid-cols-5 items-center h-14 px-6 mt-4 rounded-t-lg text-center'>
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