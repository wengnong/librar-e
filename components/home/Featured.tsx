"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FeaturedBookCover from './FeaturedBookCover'

const Featured = ({ 
    title, 
    author, 
    year, 
    description, 
    coverUrl 
}: Book) => {
    return (
        <div className='relative flex flex-col justify-center items-center w-full px-4'>
            <h1 className='z-20 paytone-one-regular text-3xl md:text-5xl text-center bg-gradient-to-r from-[#EAB139] to-[#E78B48] text-transparent bg-clip-text shadow-md'>LOVED RIGHT NOW</h1>

            <div className='relative mt-6 w-full flex justify-center'>
                <div className='flex flex-col-reverse lg:flex-row justify-start md:items-center bg-[#030C19] px-6 md:px-12 py-8 rounded-[10px] mx-4 md:mx-40 max-w-6xl shadow-lg gap-8'>

                    {/* Content */}
                    <div className='flex-1'>
                        <h1 className='passion-one-black text-5xl md:text-8xl uppercase'>{title}</h1>
                        <span className='-mt-2 passion-one-regular text-xl md:text-2xl text-[#EAB139]'>
                            by {author} <span className='text-[#E78B48]'>({year})</span>
                        </span>
                        <p className='mt-6 text-justify text-base md:text-lg'>{description}</p>

                        {/* Preview button */}
                        <Link href='/'>
                            <button className='mt-8 cursor-pointer border-2 bg-[#EAB139] py-2 px-6 md:px-8 rounded-[10px] paytone-one-regular text-sm md:text-md hover:bg-[#040a11] text-[#EAB139] hover:text-[#FFFFFF] duration-250 transition-all flex items-center'>
                                <span className='text-[#FFFFFF]'>PREVIEW</span>
                                <Image
                                    src="/icons/right-arrow.svg"
                                    alt="Arrow Right"
                                    width={5000}
                                    height={0}
                                    className="w-5 h-5 ml-1"
                                />
                            </button>
                        </Link>
                    </div>

                    {/* Book cover */}
                    <div className='flex justify-center md:justify-end items-center flex-1'>
                        <Link href='/'>
                            <div className='w-[210px] sm:w-[230px] md:w-[280px] lg:w-[320px]'>
                                <FeaturedBookCover 
                                    coverImage={coverUrl}
                                    className='rotate-3 hover:-rotate-3 transition-all duration-300 cursor-pointer'
                                />
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Featured