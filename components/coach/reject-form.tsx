"use client";
import * as z from "zod";
import { CardWrapper } from './card-wrapper'
import {useForm} from "react-hook-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { CoachRejectSchema } from '@/schemas';
import { useState, useTransition } from "react";
import { createRequest } from "@/actions/coach/createRequest";
import { RejectRequest } from "@/actions/coach/rejectRequest";
import { useRouter } from "next/navigation";

interface RejectFormProps {
  requestId : string
}

const RejectForm = ({requestId}: RejectFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [ isPending, startTransition] =  useTransition();
  const user = useCurrentUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof CoachRejectSchema>>({
    resolver :  zodResolver(CoachRejectSchema),
    defaultValues:{
      reason: "",
    }
})
  const onSubmit =(values: z.infer<typeof CoachRejectSchema>) => {
    console.log(values.reason,requestId);
    startTransition(()=>{
    RejectRequest(requestId, values).then(
      (data)=>{
        if(data.success){
          setSuccess(data.success)
          router.refresh();
        }
      })
    })
    

  }
  return (
    <CardWrapper
    headerLabel="Coach"
    backButtonLabel="Go back"
    >
      <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
        <div className="space-y-4">
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for rejection</FormLabel>
              <FormDescription>We believe in open communication even in rejection, there are things people can learn from.</FormDescription>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder='E.g "There is a lack of details from your profile."'
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
            Reject
        </Button>
        </form>
        </Form>
    </CardWrapper>
  )
}

export default RejectForm