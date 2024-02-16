"use client";
import * as z from "zod";
import { CardWrapper } from '@/components/coach/card-wrapper'
import {useForm} from "react-hook-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { CoachRequestSchema } from '@/schemas';
import { useState, useTransition } from "react";
import { createRequest } from "@/actions/coach/createRequest";

interface RequestFormProps {
  coachId : string
}

const RequestForm = ({coachId}: RequestFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [ isPending, startTransition] =  useTransition();
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof CoachRequestSchema>>({
    resolver :  zodResolver(CoachRequestSchema),
    defaultValues:{
      message: "",
    }
})
  const onSubmit =(values: z.infer<typeof CoachRequestSchema>) => {
    console.log(values);
    createRequest(values, coachId).then(
      (data)=>{
        if(data.success){
          setSuccess(data.success)
        }
        if(data.error){
          setError(data.error)
        }
      })
    

  }
  return (
    <CardWrapper
    headerLabel="Coach"
    backButtonLabel="Return to Catalogue"
    backButtonHref="/"
    >
      <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
        <div className="space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message for the coach</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="A simple introduction about yourself and why you want to work with the coach."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
            Request
        </Button>
        </form>
        </Form>
    </CardWrapper>
  )
}

export default RequestForm