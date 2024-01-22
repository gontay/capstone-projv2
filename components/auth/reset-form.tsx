"use client";
import * as z from "zod"
import { useState, useTransition } from "react";
import { ResetSchema } from "@/schemas";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormField,
    FormMessage
} from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import Link from "next/link";
import { reset } from "@/actions/auth/reset";

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [ isPending, startTransition] =  useTransition();
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues:{
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('');
        setSuccess('');

        console.log(values);
        startTransition(()=>{
            reset(values)
            .then((data)=>{
                setError(data?.error);
                //todo : add when doing 2fa
                setSuccess(data?.success);
            });
        });
        
    }

    return (
        <CardWrapper
        headerLabel="Forgot your password?"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="something@example.com"
                                        type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                            Send reset link
                    </Button>
                </form>
            </Form>
        </CardWrapper>
           
    );
}