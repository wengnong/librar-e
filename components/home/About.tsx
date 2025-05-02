import React from 'react'

const About = () => {
    return (
        <div className='relative flex flex-col md:flex-row justify-center items-center bg-[#030C19] my-20 md:my-40 px-6 md:px-20 py-16 w-full gap-8'>
            <h1 className='w-full md:w-1/3 text-[#EAB139] paytone-one-regular text-3xl md:text-5xl text-center md:text-left'>
                WHAT IS <span className='text-[#FFFFFF]'>LIBRAR-E</span> ALL ABOUT?
            </h1>

            <div className='bg-[#EAB139] py-10 md:py-16 px-6 md:px-20 w-full md:w-1/2 rounded-bl-[40px] md:rounded-bl-[60px] rounded-tr-[40px] md:rounded-tr-[60px]'>
                <div className='flex justify-center items-center'>
                    <p className='text-[#0A2647] text-justify text-base md:text-lg leading-relaxed'>
                        <span className='paytone-one-regular text-2xl md:text-3xl inline-block -rotate-[3deg] md:-rotate-[4deg]'>
                            LIBRAR-E
                        </span> is a web-based online library designed to make books accessible anytime, anywhere. With a mission to boost reading habits, especially in Indonesia where literacy access to books for everyone. It&apos;s all about making reading easy, fun, and just a click away!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About