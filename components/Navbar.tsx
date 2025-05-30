'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { signOut } from "next-auth/react";

import React, { useEffect, useState } from 'react' 
import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Session } from 'next-auth'
import { getInitials } from '@/lib/utils'

const Navbar = ({ session }: { session: Session }) => {
  const [storedImage, setStoredImage] = useState<string | null>(null);
  const userImage = storedImage || session?.user?.image;

  useEffect(() => {
    if (!session?.user?.name) return;

    const localStorageKey = `profile-image-${session.user.name}`;
    const savedImage = localStorage.getItem(localStorageKey);

    if (savedImage) {
        setStoredImage(savedImage);
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                    <Avatar>
                        {userImage ? (
                        <AvatarImage src={userImage} alt="Profile" />
                        ) : (
                        <AvatarFallback className='bg-gray-500 text-white'>
                            {getInitials(session?.user?.name || "IN")}
                        </AvatarFallback>
                        )}
                    </Avatar>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-48 bg-[#EAB139]">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => window.location.href = '/my-profile'}
                        className="border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 flex items-center justify-center cursor-pointer"
                        >
                        Profile
                    </DropdownMenuItem>

                    {/* <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <button
                            type="button"
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className='w-full border-2 border-[#0A2647] rounded-[10px] px-4 py-1 bg-[#0A2647] text-[#EAB139] hover:bg-[#040a11] hover:border-[#EAB139] duration-200 flex items-center justify-center cursor-pointer'
                        >
                            Logout
                        </button>
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;