'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getBookById, updateBook } from '@/lib/actions/book'
import { bookSchema } from "@/lib/validations"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/FileUpload"
import { toast } from "sonner"

type Book = {
    id: string
    title: string
    description: string
    year: number
    author: string
    genre: string
    rating: number
    coverUrl: string
    fileUrl: string
    createdAt: Date | null
}

interface EditBookPageProps {
    params: {
        id: string
    }
}

const Page = ({ params }: EditBookPageProps) => {
    const router = useRouter()
    const [book, setBook] = useState<Book | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            year: 1,
            author: "",
            genre: "",
            rating: 1,
            coverUrl: "",
            fileUrl: "",
        },
    })

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setIsLoading(true)
                const bookData = await getBookById(params.id)
                
                if (!bookData) {
                    setError('Book not found')
                    return
                }

                setBook(bookData)
                // Reset form dengan data buku yang diambil
                form.reset({
                    title: bookData.title,
                    description: bookData.description,
                    year: bookData.year,
                    author: bookData.author,
                    genre: bookData.genre,
                    rating: bookData.rating,
                    coverUrl: bookData.coverUrl,
                    fileUrl: bookData.fileUrl
                })
            } catch (err) {
                console.error('Error fetching book:', err)
                setError('Failed to load book data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchBook()
    }, [params.id, form])

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        try {
            const result = await updateBook(params.id, {
                title: values.title.trim(),
                description: values.description.trim(),
                year: values.year,
                author: values.author.trim(),
                genre: values.genre,
                rating: values.rating,
                coverUrl: values.coverUrl.trim(),
                fileUrl: values.fileUrl.trim()
            })

            if (result.success) {
                toast("Success", {
                    description: "Book updated successfully",
                })
                router.push('/admin/books')
            } else {
                toast("Error", {
                    description: result.error || 'Failed to update book. Please try again.',
                })
            }
        } catch (err) {
            console.error('Error updating book:', err)
            toast("Error", {
                description: 'Failed to update book. Please try again.',
            })
        }
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen p-4 md:p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EAB139] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading book data...</p>
                </div>
            </div>
        )
    }

    if (error && !book) {
        return (
            <div className="w-full min-h-screen p-4 md:p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Link 
                        href="/admin/books" 
                        className="bg-[#EAB139] text-black px-6 py-2 rounded-lg hover:bg-[#d99e2e] transition"
                    >
                        Back to Books
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-black text-lg font-medium">Edit Book</h1>
                            <p className="text-gray-600 text-sm mt-1">Update book information</p>
                        </div>
                        <Link 
                            href="/admin/books" 
                            className="text-gray-600 hover:text-gray-800 transition"
                        >
                            ← Back to Books
                        </Link>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm max-w-2xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4">
                        <FormField
                            control={form.control}
                            name={"title"}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 w-full">
                                    <FormLabel className="text-base">
                                        Book Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            required
                                            placeholder="Book title"
                                            {...field}
                                            className="bg-[#FFFFFF]/85 border-[#393E46] border-2 w-full min-h-14 font-bold placeholder:text-[#FE7743] text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-[#FE7743]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name={"author"}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 w-full">
                                    <FormLabel className="text-base">
                                        Author
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            required
                                            placeholder="Book author"
                                            {...field}
                                            className="bg-[#FFFFFF]/85 border-[#393E46] border-2 w-full min-h-14 font-bold placeholder:text-[#FE7743] text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-[#FE7743]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"year"}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 w-full">
                                    <FormLabel className="text-base">
                                        Published Year
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={9999}
                                            placeholder="Book year"
                                            {...field}
                                            className="bg-[#FFFFFF]/85 border-[#393E46] border-2 w-full min-h-14 font-bold placeholder:text-[#FE7743] text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-[#FE7743]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"genre"}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 w-full">
                                    <FormLabel className="text-base">
                                        Genre
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            required
                                            placeholder="Book genre"
                                            {...field}
                                            className="bg-[#FFFFFF]/85 border-[#393E46] border-2 w-full min-h-14 font-bold placeholder:text-[#FE7743] text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-[#FE7743]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"rating"}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 w-full">
                                    <FormLabel className="text-base">
                                        Rating
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            min={1}
                                            max={5}
                                            placeholder="Book rating"
                                            {...field}
                                            className="bg-[#FFFFFF]/85 border-[#393E46] border-2 w-full min-h-14 font-bold placeholder:text-[#FE7743] text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-[#FE7743]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"description"}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 w-full">
                                    <FormLabel className="text-base">
                                        Book Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Book description"
                                            {...field}
                                            rows={10}
                                            className="bg-[#FFFFFF]/85 border-[#393E46] border-2 w-full min-h-14 font-bold placeholder:text-[#FE7743] text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-[#FE7743]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"fileUrl"}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 w-full">
                                    <FormLabel className="text-base">
                                        PDF File Url
                                    </FormLabel>
                                    <FormDescription>
                                        <ul className='text-gray-400'>
                                            <li>1. Go to this link: <a className='text-red-400 font-bold hover:underline' href="https://drive.google.com/drive/folders/1OSWvjUUCDaa-Vf1xUPiVkMTkgcNWqxyH?usp=sharing">Librar-E Book Files</a>, and add your PDF book there.</li>
                                            <li>2. Set book permission to viewer on <span className='underline'>anyone with the link</span> within share settings.</li>
                                            <li>3. Uncheck <span className='underline'>viewers and commenters can see the option to download, print, and copy</span>.</li>
                                            <li>4. Copy the book link and add it to the file upload input below.</li>
                                        </ul>
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Book pdf"
                                            {...field}
                                            rows={10}
                                            className="bg-[#FFFFFF]/85 border-[#393E46] border-2 w-full min-h-14 font-bold placeholder:text-[#FE7743] text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-[#FE7743]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"coverUrl"}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 w-full">
                                    <FormLabel className="text-base">
                                        Book Image
                                    </FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            type="image"
                                            accept="image/*"
                                            placeholder="Upload a book cover"
                                            folder="books/covers"
                                            variant="light"
                                            onFileChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {book?.createdAt && (
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Originally Created
                                </label>
                                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                                    {new Date(book.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-4 w-full">
                            <Button 
                                type="submit" 
                                disabled={form.formState.isSubmitting}
                                className="flex-1 bg-orange-400 text-white hover:bg-orange-800 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {form.formState.isSubmitting ? 'Updating...' : 'Update Book'}
                            </Button>
                            <Link
                                href="/admin/books"
                                className="flex-1 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition text-center flex items-center justify-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page