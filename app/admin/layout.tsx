import { auth } from '@/auth'
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/Sidebar'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (!session?.user?.id) redirect('/sign-in');

    return (
        <main className='flex flex-col md:flex-row min-h-screen w-full bg-[#041224]'>
            <Sidebar session={session} />

            <div className='flex-1 flex flex-col bg-[#E9E9E9] text-[#000000] p-4'>
                <div className='mb-8'>
                    <Header session={session} />
                </div>
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default layout