import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import React from 'react'
import { eq } from "drizzle-orm"
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import BookDetails from '@/components/books/BookDetails'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    const session = await auth();

    const [bookDetails] = await db
        .select()
        .from(books)
        .where(eq(books.id, id))
        .limit(1);
    
    if (!bookDetails) {
        redirect("/404");
    }

    return (
        <>
            <BookDetails {...bookDetails} userId={session?.user?.id as string} />
        </>
    )
}

export default page