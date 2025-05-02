import React from 'react'

export const About = () => {
    return (
        <div className='relative flex justify-center items-center bg-[#030C19] my-40 p-20 w-full'>
            <h1 className='w-1/3 text-[#EAB139] paytone-one-regular text-5xl mr-8'>WHAT IS <span className='text-[#FFFFFF]'>LIBRAR-E</span> ALL ABOUT?</h1>

            <div className='bg-[#EAB139] py-16 px-20 w-1/2 rounded-bl-[60px] rounded-tr-[60px]'>
                <div className='flex justify-center items-center'>
                    <p className='text-[#0A2647] text-justify text-lg'><span className='paytone-one-regular text-3xl inline-block -rotate-[4deg]'>LIBRAR-E</span> is a web-based online library designed to make books accessible anytime, anywhere. With a mission to boost reading habits, especially in Indonesia where literacy access to books for everyone. It&apos;s all about making reading easy, fun, and just a click away!</p>
                </div>
            </div>
        </div>
    )
}
