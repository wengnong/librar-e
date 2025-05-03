"use server"

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">,) => {
    const { email, password } = params;

    try {
        const result = await signIn("credentials", {
            email, 
            password, 
            redirect: false,
        })

        if (result?.error) {
            return { success: false, error: result.error };
        }

        return { success:true };
    } catch (error) {
        console.log(error, "Sign in error");
        return { success: false, error: "Sign in error" };
    }
}

export const signUp = async (params: AuthCredentials) => {
    const { username, email, password } = params;

    // if user already exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    
    if (existingUser.length > 0) {
        return { success: false, error: "User already exists" };
    }

    // create new user
    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            username,
            email,
            password: hashedPassword,
        });

        await signInWithCredentials({ email, password });

        return { success: true };
    } catch(error) {
        console.log(error, "Sign up error");
        return { success: false, error: "Sign up error" };
    }
};