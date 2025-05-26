import { signOut } from '@/auth';
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-min-screen'>
            <div className='flex flex-col md:flex-row justify-between gap-5 mb-6'>
                <div className='bg-[#EAB139] rounded-2xl p-5 w-full shadow-sm'>
                    <p className='text-black text-lg font-medium'>Books Dashboard</p>
                </div>
            </div>

            {/* Bagian button buat logout */}
            <form action={async () => {
                "use server";

                await signOut();
            }}
                className='mb-10'
            >
                <button className='border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 flex items-center justify-center'>Logout</button>
            </form>


        </div>
    )
}

export default page