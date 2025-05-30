"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Session } from 'next-auth'
import { getInitials } from '@/lib/utils'

const Navbar = ({ session }: { session: Session }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user?.name) {
        const storedImage = localStorage.getItem(`profile-image-${session.user.name}`);
        if (storedImage) {
            setProfileImage(storedImage);
        }
        }
    }, [session?.user?.name]);

    return (
        <nav className='py-4 px-8 paytone-one-regular shadow-lg'>
            <div className='flex items-center justify-between gap-4'>
                <Link href='/'><Image src="/images/Logo.png" width={140} height={140} alt="Librar-E Logo" /></Link>

                <div className='flex gap-8 text-[10px]'>
                    <Link className='border-2 rounded-[10px] px-4 py-1 hover:bg-[#EAB139] hover:text-[#041224] duration-200 transition-all flex items-center justify-center' href="/library">
                        START YOUR BOOK JOURNEY
                    </Link>
                    {!session ? (
                        <Link className='border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 flex items-center justify-center' href="/sign-in">
                            SIGN IN
                        </Link>
                    ) : (
                        <Link href='/my-profile'>
                            <Avatar>
                                {profileImage ? (
                                <AvatarImage src={profileImage} alt='Profile' />
                                ) : (
                                <AvatarFallback className='bg-gray-500 text-white'>
                                    {getInitials(session?.user?.name || "IN")}
                                </AvatarFallback>
                                )}
                            </Avatar>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
