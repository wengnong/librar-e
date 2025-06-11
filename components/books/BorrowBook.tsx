"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';
import { checkUserBookBorrow } from '@/lib/actions/user';

interface Props {
    userId: string;
    bookId: string;
}

const BorrowBook = ({ bookId, userId }: Props) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);
    const [isAlreadyBorrowed, setIsAlreadyBorrowed] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkBorrowStatus = async () => {
            try {
                const result = await checkUserBookBorrow(userId, bookId);
                if (result.success) {
                    setIsAlreadyBorrowed(result.isAlreadyBorrowed);
                }
            } catch (error) {
                console.log("Error checking borrow status:", error);
            } finally {
                setChecking(false);
            }
        };

        checkBorrowStatus();
    }, [userId, bookId]);

    const handleBorrow = async () => {
        if (isAlreadyBorrowed) {
            toast("Already Borrowed", {
                description: "You have already borrowed this book and haven't returned it yet.",
            });
            return;
        }

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
                    description: result.error || "An error occurred while borrowing the book.",
                });
            }
        } catch(error) {
            console.log(error)
            toast("Error", {
                description: "An error occurred while borrowing the book.",
            });
        } finally {
            setBorrowing(false);
        }
    };

    if (checking) {
        return (
            <div className='flex justify-center xl:justify-start'>
                <Button
                    className='mt-4 cursor-pointer border-2 bg-purple-400 py-6 px-8 md:py-6 md:px-10 rounded-[10px] paytone-one-regular text-lg md:text-xl'
                    disabled
                >
                    <span className='text-[#FFFFFF]'>CHECKING...</span>
                </Button>
            </div>
        );
    }

    return (
        <div className='flex justify-center xl:justify-start'>
            <Button
                className={`mt-4 cursor-pointer border-2 py-6 px-8 md:py-6 md:px-10 rounded-[10px] paytone-one-regular text-lg md:text-xl duration-250 transition-all flex items-center ${
                    isAlreadyBorrowed 
                        ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' 
                        : 'bg-[#EAB139] hover:bg-[#040a11] text-[#EAB139] hover:text-[#FFFFFF]'
                }`}
                onClick={handleBorrow}
                disabled={borrowing || isAlreadyBorrowed}
            >
                <span className='text-[#FFFFFF]'>
                    {borrowing ? "BORROWING" : 
                        isAlreadyBorrowed ? "BORROWED" : "BORROW"}
                </span>
            </Button>
        </div>
    )
}

export default BorrowBook