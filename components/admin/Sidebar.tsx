'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Session } from 'next-auth';
import { cn, getInitials } from '@/lib/utils';
import { adminSideBarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
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
    <div className='w-full md:w-55 bg-[#041224] text-white h-full md:min-h-screen'>
      <Link href='/'>
        <Image
          className='flex pt-4 pl-4'
          src='/images/Logo.png'
          width={140}
          height={140}
          alt='Librar-E Logo'
        />
      </Link>

      <hr className='my-5 h-1 border-t-0 bg-[#EAB139]' />

      {/* Admin Profile */}
      <div className='flex flex-col items-start px-6'>
        <Link href='/my-profile'>
          <Avatar className='size-20'>
            {userImage ? (
              <AvatarImage src={userImage} alt='Profile' />
            ) : (
              <AvatarFallback className='bg-gray-500 text-white text-3xl'>
                {getInitials(session?.user?.name || 'IN')}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>

        <div className='flex flex-col max-md:hidden'>
          <h1 className='mt-2 text-xl font-semibold'>{session?.user?.name || 'Username'}</h1>
          <p className='text-sm text-gray-300'>{session?.user?.email || 'emailuser@gmail.com'}</p>
        </div>
      </div>

      <hr className='my-5 h-1 border-t-0 bg-[#EAB139]' />

      {/* Sidebar Content */}
      <div className='mt-6 flex flex-col gap-3 px-4'>
        {adminSideBarLinks.map((link) => {
          const isSelected =
            (link.route !== '/admin' &&
              pathname.includes(link.route) &&
              link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link href={link.route} key={link.route}>
              <div
                className={cn(
                  'flex items-center gap-4 px-4 py-2 rounded-lg transition-colors hover:bg-amber-100 hover:text-black',
                  isSelected && 'bg-[#EAB139] text-black'
                )}
              >
                <div className='relative w-5 h-5'>
                  <Image
                    src={link.img}
                    alt='icon'
                    fill
                    className={cn(
                      'object-contain',
                      isSelected ? '' : 'invert'
                    )}
                  />
                </div>

                <p className='text-sm font-medium leading-none'>{link.text}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
