import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className='bg-[#EAB139] mt-40 flex flex-row w-full'>
            {/* Left side */}
            <div className='bg-[#030C19] py-14 px-8 w-1/3 flex justify-start items-center'>
                <Image
                    src="/images/footer-logo-and-quote.png"
                    alt=""
                    width={2100}
                    height={0}
                    className="w-[400px]"
                />
            </div>

            {/* Right side (social link lists) */}
            <div className='py-14 px-8 w-2/3 text-[#030C19]'>
                <span className='passion-one-bold text-2xl select-none'>CONNECT WITH US!</span>
                <ul className='flex flex-col gap-1'>
                    <li><span className='cursor-pointer hover:underline'>Instagram</span></li>
                    <li><span className='cursor-pointer hover:underline'>Facebook</span></li>
                    <li><span className='cursor-pointer hover:underline'>Discord</span></li>
                    <li><span className='cursor-pointer hover:underline'>X</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer