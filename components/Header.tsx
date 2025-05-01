import React from 'react'
import Image from 'next/image'

const Header = () => {
    return (
        <header className="relative w-full h-screen overflow-hidden">
            <div className='z-10 flex flex-col items-center justify-center w-full gap-10'>
                <h1 className='text-white text-3xl mt-20 text-center passion-one-bold'>
                    READ ANYWHERE, EVERYWHERE.
                </h1>

                <div className='z-20'>
                    <Image 
                        src="/images/header-books.png"
                        alt="Books"
                        width={3000}
                        height={0}
                        className='w-dvh h-auto'
                    />
                </div>
            </div>

            {/* Background Preset*/}
            <Image
                src="/images/header-bg.svg"
                alt="Background"
                width={0}
                height={0}
                sizes="100vw"
                className='w-full h-auto absolute top-0 left-0 z-[-10]'
            />
        </header>
    )
}

export default Header
