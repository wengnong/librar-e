import { signOut } from '@/auth';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
    return (
        <div className='w-full h-min-screen'>
            <div className='flex flex-col md:flex-row justify-center gap-5 mb-6 p-10'>
                <div className='bg-[#EAB139] rounded-2xl p-5 h-50 content-center w-3xl grid grid-cols-2 gap-4 shadow-sm'>
                    <Link href='/'>
                        <Image
                            className='flex pt-4 pl-4'
                            src='/images/Logo.png'
                            width={140}
                            height={140}
                            alt='Librar-E Logo'
                        />
                    </Link>
                    <div className='flex flex-col text-left'> 
                        <p className='text-black text-lg font-medium'>Name:----------------------</p>
                        <p className='text-black text-lg font-medium'>Joined: XX/XX/XXXX</p>
                        <p className='text-black text-lg font-medium'>Last Active: XX/XX/XXXX</p>
                        <p className='text-black text-lg font-medium'>Books Read:120</p>
                    </div>

                    <div>
                        <form action={async () => {
                            "use server";

                            await signOut();
                        }}
                            className=''
                        >
                            <button className='border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 flex items-center justify-center'>Logout</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bagian button buat logout  TAPI DIKOMEN DULU buat testing layout yang rapian dikit*/}
            {/* <form action={async () => {
                "use server";

                await signOut();
            }}
                className='mb-10'
            >
                <button className='border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 flex items-center justify-center'>Logout</button>
            </form> */}


        </div>
    )
}

export default page