'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { createBook } from "@/lib/admin/actions/book"

const Page = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            year: new Date().getFullYear(),
            author: "",
            genre: "",
            rating: 1,
            coverUrl: "",
            fileUrl: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        try {
            const result = await createBook(values)

            if (result.success) {
                toast("Success", {
                    description: "Book created successfully",
                })
                router.push('/admin/books')
            } else {
                toast("Error", {
                    description: result.message || 'Failed to create book. Please try again.',
                })
            }
        } catch (err) {
            console.error('Error creating book:', err)
            toast("Error", {
                description: 'Failed to create book. Please try again.',
            })
        }
    }

    return (
        <div className="w-full min-h-screen p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-black text-lg font-medium">Add New Book</h1>
                            <p className="text-gray-600 text-sm mt-1">Create a new book entry</p>
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

            {/* Add Form */}
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

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-4 w-full">
                            <Button 
                                type="submit" 
                                disabled={form.formState.isSubmitting}
                                className="flex-1 bg-orange-400 text-white hover:bg-orange-800 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {form.formState.isSubmitting ? 'Adding...' : 'Add Book to Library'}
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