import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='py-4 px-8 paytone-one-regular shadow-lg'>
            <div className='flex items-center justify-between gap-4'>
                <Link href='/'><Image src="/images/Logo.png" width={140} height={140} alt="Librar=E Logo" /></Link>

                <div className='flex gap-8 text-[10px]'>
                    <Link className='border-2 rounded-[10px] px-4 py-1 hover:bg-[#EAB139] hover:text-[#041224] duration-200 transition-all' href="/library">START YOUR BOOK JOURNEY</Link>
                    <Link className='border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 ' href="/register">SIGN IN</Link> 
                </div>
            </div>
        </nav>
    )
}

export default Navbar