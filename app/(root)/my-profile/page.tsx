import { signOut } from '@/auth';
import React from 'react'

const page = () => {
    return (
        <form action={async () => {
            "use server";

            await signOut();
        }}
            className='mb-10'
        >
            <button className='border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 flex items-center justify-center'>Logout</button>
        </form>
    )
}

export default page