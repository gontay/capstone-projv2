import { UserRole} from "@prisma/client";
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
    bio: z.optional(z.string().max(1000)),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.COACH]),
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
        rate: z.number(),
        introduction: z.string().max(1000),
        expertises: z.array(z.string()).optional()
    }
)

export const CoachUpdateSchema = z.object(
    {
        rate: z.number(),
        introduction: z.string(),
        expertises: z.array(z.string()).optional()
    }
)

export const CoachRequestSchema = z.object(
    {
        message: z.string().optional()
    }
)


export const CoachRejectSchema = z.object(
    {
        reason: z.string()
    }
)

export const JournalEntrySchema = z.object(
    {
        title: z.string(),
        content: z.string(),
        privacy: z.boolean()
    }
)

export const RatingSchema = z.object(
    {
        rating: z.number().gt(0).lte(5),
        review: z.string().optional()
    }
)