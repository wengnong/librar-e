"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';

interface Props {
    userId: string;
    bookId: string;
}

const BorrowBook = ({ bookId, userId }: Props) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);

    const handleBorrow = async () => {
        setBorrowing(true);

        try {
            const result = await borrowBook({ bookId, userId });
            
            if (result.success) {
                toast("Success", {
                    description: "Book borrowed successfully",
                });

                router.push('/my-profile');
            } else {
                toast("Error", {
                    description: "AN error occurred while borrowing the book.",
                });
            }
        } catch(error) {
            console.log(error)
            toast("Error", {
                description: "AN error occurred while borrowing the book.",
            });
        } finally {
            setBorrowing(false);
        }
    };

    return (
        <div className='flex justify-center xl:justify-start'>
            <Button
                className='mt-4 cursor-pointer border-2 bg-[#EAB139] py-6 px-8 md:py-6 md:px-10 rounded-[10px] paytone-one-regular text-lg md:text-xl hover:bg-[#040a11] text-[#EAB139] hover:text-[#FFFFFF] duration-250 transition-all flex items-center'
                onClick={handleBorrow}
                disabled={borrowing}
            >
                <span className='text-[#FFFFFF]'>{borrowing ? "BORROWING" : "BORROW"}</span>
            </Button>
        </div>
    )
}

export default BorrowBook