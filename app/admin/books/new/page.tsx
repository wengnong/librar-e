import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <button className='h-8 flex items-center justify-center bg-[#030C19] text-white text-sm font-medium gap-2 px-6 rounded-lg transition hover:bg-[#030C19]'>
                <Link href='/admin/books'>Back to Books</Link>
            </button>

            <div className='w-full overflow-hidden'>
                {/* book form */}
            </div>
        </div>
    )
}

export default page