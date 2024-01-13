"use server";
import { LoginSchema } from "@/schemas";
import { signIn} from "@/auth";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerficationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>)=>{
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success){
        return {error : "Invalid fields"};
    }
    
    const {email, password } =  validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Email does not exists"}
    }

    if (!existingUser.emailVerified){
        const verificationToken = await generateVerficationToken(
            existingUser.email,
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Confirmation email sent!"};
        }

    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    }catch(error){
        if (error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid Credentials!"}
                default:
                    return {error : "Something went wrong"}
            }
        }

        throw error;
    }
}