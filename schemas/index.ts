import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema  = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    })
});


export const RegisterSchema  = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(8,{
        message: "Minimum of 8 characters required"
    }),
    name: z.string().min(1,{
        message: "Name is required"
    })
});

export const ResetSchema  = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
});

export const NewPasswordSchema  = z.object({
    password: z.string().min(8,{
        message: "Minimum of 8 characters required"
    }),
});

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
})
    .refine((data)=>{
        if(data.password && !data.newPassword ){
            return false
        }

        return true;
    },{
        message: "New password is required",
        path: ["newPassword"]
    })
    .refine((data)=>{
        if(data.newPassword && !data.password ){
            return false
        }
        return true
    },{
        message: "Please confirm your old password",
        path: ["password"]
    });

export const CoachOnboardSchema = z.object(
    {
        name: z.optional(z.string()),
        rate: z.number(),
        introduction: z.string(),
        expertises: z.array(z.string()).optional()
    }
)