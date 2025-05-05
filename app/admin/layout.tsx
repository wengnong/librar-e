import { auth } from '@/auth'
import Sidebar from '@/components/admin/Sidebar';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (!session?.user?.id) redirect("/sign-in");

    return (
        <main className='flex flex-row min-h-screen w-full bg-[#041224]'>
            <Sidebar />

            <div className='flex w-[calc(100%-264px)] flex-1 flex-col bg-[#E9E9E9] p-5 xs:p-10'>
                <p>Header</p>
                {children}
            </div>
        </main>
    )
}

export default layout