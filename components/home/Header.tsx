import React from 'react'
import Image from 'next/image'

const Header = () => {
    return (
        <header className="relative w-full h-[120vh] overflow-hidden">
            <div className='flex flex-col items-center justify-center w-full gap-10'>
                <h1 className='text-white text-3xl mt-20 text-center passion-one-bold'>
                    READ ANYWHERE, EVERYWHERE.
                </h1>

                <div className='z-20 flex justify-center items-center relative w-full'>
                <div className="absolute bottom-0 z-10 flex justify-center">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Image
                            src="/icons/search.svg"
                            width={0}
                            height={0}
                            alt="Search"
                            className="w-4 h-4 text-[#EAB139]"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="What are you looking for today ?"
                        className="paytone-one-regular text-md py-3 px-8 border-5 border-[#EAB139] text-[#EAB139] rounded-full p-2 w-[70vw] bg-[#FFFFFF] focus:outline-none"
                    />
                </div>

                    <Image 
                        src="/images/header-books.png"
                        alt="Books"
                        width={3000}
                        height={0}
                        className='w-[60vw] h-auto z-0'
                    />
                </div>
            </div>

            {/* Background Preset*/}
            <Image
                src="/images/header-bg.svg"
                alt="Background"
                width={0}
                height={0}
                className="w-full h-auto absolute top-0 left-0 z-[-10]"
            />
        </header>
    )
}

export default Header
