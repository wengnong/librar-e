import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Session } from 'next-auth'
import { getInitials } from '@/lib/utils'

const Sidebar = ({ session } : { session: Session }) => {
    return (
        <div>
            <Link href='/'><Image className="flex pt-4 pl-4" src="/images/Logo.png" width={140} height={140} alt="Librar-E Logo" /></Link>

            <hr className="my-5 h-1 border-t-0 bg-amber-200" />
            <div className='flex-col p-6 pr-10'>
                
                <Link href='/my-profile' className='flex items-center justify-center'>
                    <Avatar>
                        <AvatarFallback className='bg-gray-500 text-white'>
                            {getInitials(session?.user?.name || "IN")}
                        </AvatarFallback>
                    </Avatar>
                </Link>

                <h1 className='text-center text-shadow-white text-2xl'>Username</h1>
                <p className='text-center'>emailuser@gmail.com</p>
            </div>
            <hr className="my-5 h-1 border-t-0 bg-amber-200" />

            
            <div className='flex-col pt-8 pr-3'>
                <div className='h-10 w bg-[#F4CA85] text-center flex items-center justify-center rounded-r-lg text-black'>Users</div>
            </div>

            <div className='flex-col pt-3.5 pr-3'> 
                <h2 className='h-10 bg-[#F4CA85] text-center flex justify-center items-center rounded-r-lg text-black'>Books</h2>
            </div>
        </div>
            
    )
}

export default Sidebar