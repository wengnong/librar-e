import React, { ReactNode } from 'react'
import Image from 'next/image'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative flex flex-col-reverse lg:h-screen lg:overflow-hidden sm:flex-row'>
            {/* Form */}
            <section className='my-auto flex h-full min-h-screen flex-1 items-center bg-cover bg-top bg-dark-100 px-5 py-10'>
                <div className='bg-[#030C19] mx-auto flex max-w-xl flex-col gap-6 rounded-[10px] p-10'>
                    <Image
                            src="/images/Logo.png" 
                            width={140} 
                            height={140} 
                            alt="Librar-E Logo" 
                    />

                    <div>
                        {children}
                    </div>
                </div>
            </section>

            {/* Illustration */}
            <section className='sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1 shadow-lg'>
                <Image
                    src="/images/auth-illustration.jpg" 
                    width={1000} 
                    height={1000}
                    alt="Librar-E Logo"
                    className='size-full object-cover brightness-80'
                />
            </section>
        </main>
    )
}

export default layout