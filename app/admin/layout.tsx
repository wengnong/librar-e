import { auth } from '@/auth'
import Sidebar from '@/components/admin/Sidebar';
import { Session } from 'inspector/promises';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (!session?.user?.id) redirect("/sign-in");

    return (
        <main className="flex flex-row min-h-screen w-full bg-[#041224]">
            <Sidebar />

            {/* Right side content */}
            <div className="flex-1 flex flex-col bg-[#E9E9E9] p-10 space-y-5">
                
                {/* ini Books Dashboard + Search */}
                <div className="flex justify-between space-x-5">
                <div className="bg-white rounded-2xl p-5 w-full max-w-xl shadow-sm">
                    <p className="text-black text-lg font-medium">Books Dashboard</p>
                </div>
                <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-sm">
                    <p className="text-black text-lg font-medium">Search</p>
                </div>
                </div>

                {/* Main page */}
                <div className="flex-1">
                {children}
                </div>
            </div>
        </main>

    )
}

export default layout