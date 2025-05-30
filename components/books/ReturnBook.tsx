"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { returnBook } from '@/lib/actions/book'

interface Props {
    borrowRecordId: string;
    bookTitle: string;
}

const ReturnBook = ({ borrowRecordId, bookTitle }: Props) => {
    const router = useRouter();
    const [returning, setReturning] = useState(false);

    const handleReturn = async () => {
        setReturning(true);

        try {
            const result = await returnBook(borrowRecordId);
            
            if (result.success) {
                toast("Success", {
                    description: `"${bookTitle}" returned successfully`,
                });

                router.refresh();
            } else {
                toast("Error", {
                    description: result.error || "An error occurred while returning the book.",
                });
            }
        } catch(error) {
            console.log(error)
            toast("Error", {
                description: "An error occurred while returning the book.",
            });
        } finally {
            setReturning(false);
        }
    };

    return (
        <button 
            className="text-[10px] bg-[#0A2647] text-white px-2 py-2 rounded-md hover:bg-[#040a11] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleReturn}
            disabled={returning}
        >
            {returning ? "RETURNING..." : "RETURN"}
        </button>
    )
}

export default ReturnBook