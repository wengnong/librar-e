import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Featured = ({ title, author, year, description, cover }: FeaturedBook) => {
    return (
        <div className='relative flex flex-col justify-center items-center w-full'>
            <h1 className='z-20 paytone-one-regular text-5xl bg-gradient-to-r from-[#EAB139] to-[#E78B48] text-transparent bg-clip-text shadow-md'>LOVED RIGHT NOW</h1>

            <div className='relative mt-6 w-full flex justify-center'>
                {/* Container */}
                <div className='flex flex-col justify-start bg-[#030C19] px-12 py-8 rounded-[10px] mx-40 max-w-6xl shadow-lg'>
                    <h1 className='passion-one-black text-8xl uppercase'>{title}</h1>
                    <span className='-mt-2 passion-one-regular text-2xl text-[#EAB139]'>by {author} <span className='text-[#E78B48]'>({year})</span></span>
                    <span className='mt-6 w-1/2 text-justify text-lg'>{description}</span>

                    {/* Buttons */}
                    <div className='flex flex-row mt-8 gap-8 items-center'>
                        <Link href='/'>
                            <button className='cursor-pointer border-2 bg-[#EAB139] py-2 px-8 rounded-[10px] paytone-one-regular text-md hover:bg-[#040a11] text-[#EAB139] hover:text-[#FFFFFF] duration-250 transition-all flex items-center'>
                                <span className='text-[#FFFFFF]'>PREVIEW</span>
                                <Image
                                    src="/icons/right-arrow.svg"
                                    width={0}
                                    height={0}
                                    alt="Arrow Right"
                                    className="w-6 h-6 ml-1"
                                />
                            </button>
                        </Link>

                        <Link href='/'>
                            <button className='cursor-pointer border-2 text-[#EAB139] py-2 px-8 rounded-[10px] paytone-one-regular text-md hover:text-[#FFFFFF] duration-250 transition-all'>
                                <span className='text-[#FFFFFF]'>Borrow Book</span>
                            </button>
                        </Link>
                    </div>
                </div>
                
                {/* Featured image */}
                <div className='absolute top-1/2 right-58 transform -translate-y-1/2 z-10'>
                    <Link href='/'>
                        <Image 
                            src={cover}
                            alt="Book Cover"
                            width={5000}
                            height={0}
                            className='w-auto h-[480px] shadow-lg rounded-[10px] rotate-4 transform hover:-rotate-4 duration-400 transition-all cursor-pointer'
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Featured