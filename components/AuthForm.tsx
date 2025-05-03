"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { ZodType } from 'zod';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { FIELD_NAMES, FIELD_PLACEHOLDER, FIELD_TYPES } from '@/constants';

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean, error?: string }>;
    type: "SIGN_IN" | "SIGN_UP";
} 

const AuthForm  = <T extends FieldValues>({ 
    type, 
    schema, 
    defaultValues, 
    onSubmit, 
}: Props<T>) => {
    const isSignIn = type === "SIGN_IN";

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    })
    
    const handleSubmit: SubmitHandler<T> = async (data) => {}
    
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <p className='text-2xl text-white passion-one-regular'>
                    {isSignIn ? 'Welcome back to Librar-E' : 'Create your library account'}
                </p>

                <p className='text-light-100'>
                    {isSignIn ? 'Access the vast collection of resources, and stay updated' : 'Please complete all fields to gain access to the library'}
                </p>
            </div>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            required 
                                            type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} 
                                            {...field}
                                            placeholder={FIELD_PLACEHOLDER[field.name as keyof typeof FIELD_PLACEHOLDER]} 
                                            className='bg-[#e8cfec] w-full min-h-14 border-none font-bold text-[#010306] placeholder:text-[#ab7ea7] focus-visible:ring-0 focus-visible:shadow-none'    
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="submit"
                        className='bg-[#EAB139] text-[#010306] hover:bg-[#ea8639] hover:text-[#FFFFFF] inline-flex min-h-14 w-full items-center justify-center rounded-[10px] px-6 py-2 font-bold cursor-pointer'
                    >
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </Button>
                </form>
            </Form>

            <p className='text-center mt-6'>
                {isSignIn ? "New to Bookwise? " : "Already have an account? "}

                <Link 
                    href={isSignIn? '/sign-up' : '/sign-in'}
                    className='font-bold text-[#EAB139] hover:underline'
                >
                    {isSignIn ? "Create an account" : "Sign in"}
                </Link>
            </p>
        </div>
    )
}

export default AuthForm