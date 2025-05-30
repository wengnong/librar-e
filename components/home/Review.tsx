'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const reviewers = [
    {
        name: 'Susan',
        quote: '“This library feels like a hidden sanctuary; peaceful, rich with stories, and totally free. Every time I visit, I find something new and inspiring. It’s a magical place that fuels my imagination.”',
        image: '/images/reviewers/sage.webp',
    },
    {
        name: 'Jimmy',
        quote: '“From thrillers to classics, I\'ve found my go-to reading spot here. The variety is incredible, and the interface is so easy to use. It feels like having a personal library at my fingertips every day.”',
        image: '/images/reviewers/brimstone.webp',
    },
    {
        name: 'Kim',
        quote: '“I never thought I\'d get hooked on e-books, but this site made it so easy and fun. With just a few clicks, I can dive into any genre I like—anywhere, anytime. It completely changed how I read.”',
        image: '/images/reviewers/jett.webp',
    },
    {
        name: 'Thomas',
        quote: '“Finding books here is like opening a treasure chest—there\'s always something exciting waiting. I\'ve read more in the past month than I did all year.”',
        image: '/images/reviewers/sova.webp',
    },
    {
        name: 'Stuart',
        quote: '“This platform reignited my love for reading. I can pick up right where I left off, anytime, anywhere. It\'s my go-to escape from a busy day.”',
        image: '/images/reviewers/breach.webp',
    },
    {
        name: 'Bob',
        quote: '“Honestly, I didn\'t expect much, but this library exceeded everything. Clean interface, amazing collection, and it\'s completely free. Can\'t ask for more.”',
        image: '/images/reviewers/iso.webp',
    },
]

const Review = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + reviewers.length) % reviewers.length)
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % reviewers.length)
    }

    const getPositionClass = (index: number) => {
        const position = (index - activeIndex + reviewers.length) % reviewers.length
        
        if (position === 0) {
            return 'z-20 scale-100 translate-x-0 opacity-100 transition-all duration-500'
        } else if (position === 1 || position === (reviewers.length - 1)) {
            return position === 1 
                ? 'z-10 scale-70 md:scale-80 translate-x-28 md:translate-x-50 opacity-40 brightness-60 blur-[1px] transition-all duration-500' 
                : 'z-10 scale-70 md:scale-80 -translate-x-28 md:-translate-x-50 opacity-40 brightness-60 blur-[1px] transition-all duration-500'
        } else {
            return position <= (reviewers.length / 2) 
                ? 'scale-50 translate-x-96 opacity-0 transition-all duration-500' 
                : 'scale-50 -translate-x-96 opacity-0 transition-all duration-500'
        }
    }

    return (
        <div className="relative w-full flex flex-col items-center my-20 px-4">
            <h1 className="z-20 paytone-one-regular text-2xl md:text-3xl text-center bg-gradient-to-r from-[#EAB139] to-[#E78B48] text-transparent bg-clip-text lowercase mb-2 select-none">wordsontheshelf</h1>
            <p className="text-center max-w-xl mx-auto text-[#FFFFFF] text-base md:text-lg leading-relaxed select-none">Hear what fellow book lovers have to say about their experience. We&apos;ve helped countless readers rekindle their love for books — one story at a time.</p>

            <div className="relative w-full max-w-6xl flex justify-center items-center h-[600px] overflow-hidden px-2 select-none">
                {/* Review cards */}
                <div className="relative flex justify-center items-center w-full h-full">
                    {reviewers.map((review, index) => (
                        <div key={index} className={`absolute transition-all duration-500 ease-in-out transform flex flex-col items-center bg-[#030C19] py-20 px-14 rounded-[12px] shadow-lg w-[320px] sm:w-[360px] md:w-[400px] min-h-[500px] text-center ${getPositionClass(index)}`}>
                            <Image
                                src={review.image}
                                alt={review.name}
                                width={1000}
                                height={1000}
                                className="w-[150px] h-[150px] border-4 border-[#EAB139] rounded-full mb-4"
                            />
                            <p className="text-white text-md">{review.quote}</p>
                            <span className="mt-6 text-[#E78B48]">{review.name}</span>
                        </div>
                    ))}
                </div>

                {/* Arrows */}
                <button onClick={handlePrev} className="cursor-pointer absolute px-3 left-2 md:left-6 z-30 bg-[#EAB139] text-black p-2 rounded-full shadow hover:scale-110 transition">&larr;</button>

                <button onClick={handleNext} className="cursor-pointer absolute px-3 right-2 md:right-6 z-30 bg-[#EAB139] text-black p-2 rounded-full shadow hover:scale-110 transition">&rarr;</button>
            </div>

            {/* Review card indicator */}
            <div className="flex gap-2 justify-center">
                {reviewers.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`cursor-pointer h-2 w-2 rounded-full transition-all duration-500 ${
                            activeIndex === index ? 'bg-[#EAB139] w-4' : 'bg-gray-400 opacity-40'
                        }`}
                        aria-label={`Go to card ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Review
