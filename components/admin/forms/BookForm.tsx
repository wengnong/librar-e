"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { toast } from "sonner";
import { createBook } from "@/lib/admin/actions/book";

interface Props extends Partial<Book> {
    type?: "create" | "update";
}

const BookForm = ({ }: Props) => {
    const router = useRouter();

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
    });

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        const result = await createBook(values);

        if (result.success) {
            toast("Success", {
                description: "Book created successfully",
            });

            router.push(`/admin/books/${result.data.id}`);
        } else {
            toast("Error", {
                description: result.message,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            Book Title
                        </FormLabel>
                        <FormControl>
                            <Input
                                required
                                placeholder="Book title"
                                {...field}
                                className="bg-[#393E46] w-full min-h-14 border-none font-bold text-[#F8F8E1] placeholder:text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none"
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
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            Author
                        </FormLabel>
                        <FormControl>
                            <Input
                                required
                                placeholder="Book author"
                                {...field}
                                className="bg-[#393E46] w-full min-h-14 border-none font-bold text-[#F8F8E1] placeholder:text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none"
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
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            Published Year
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                min={1}
                                max={9999}
                                placeholder="Book year"
                                {...field}
                                className="bg-[#393E46] w-full min-h-14 border-none font-bold text-[#F8F8E1] placeholder:text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none"
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
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            Genre
                        </FormLabel>
                        <FormControl>
                            <Input
                                required
                                placeholder="Book genre"
                                {...field}
                                className="bg-[#393E46] w-full min-h-14 border-none font-bold text-[#F8F8E1] placeholder:text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none"
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
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
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
                                className="bg-[#393E46] w-full min-h-14 border-none font-bold text-[#F8F8E1] placeholder:text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none"
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
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            Book Description
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Book description"
                                {...field}
                                rows={10}
                                className="bg-[#393E46] w-full min-h-14 border-none font-bold text-[#F8F8E1] placeholder:text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none"
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
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            PDF File Url
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Book pdf"
                                {...field}
                                rows={10}
                                className="bg-[#393E46] w-full min-h-14 border-none font-bold text-[#F8F8E1] placeholder:text-[#FE7743] focus-visible:ring-0 focus-visible:shadow-none"
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
                        <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
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

                <Button type="submit" className="bg-orange-400 text-white hover:bg-orange-800 cursor-pointer transition-all duration-300">
                    Add Book to Library
                </Button>
            </form>
        </Form>
    );
};
export default BookForm;