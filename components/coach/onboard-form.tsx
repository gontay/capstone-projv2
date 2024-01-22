"use client";
import * as z from "zod"
import { useState, useTransition } from "react";
import {useForm} from "react-hook-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
    FormDescription
} from "@/components/ui/form"

import { CardWrapper } from './card-wrapper';
import { CoachOnboardSchema } from "@/schemas";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { onboard } from "@/actions/coach/onboard";
import { redirect } from "next/navigation";


const expertises = [
    {
      id: "Finance",
      label: "Finance",
    },
    {
      id: "Personal",
      label: "Personal",
    },
    {
      id: "Professional",
      label: "Professional",
    },
    {
      id: "Career",
      label: "Career",
    },
    {
      id: "Behavioural",
      label: "Behavioural",
    },
    {
      id: "Wellness",
      label: "Wellness",
    },
  ] as const


const OnboardForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [ isPending, startTransition] =  useTransition();
    const user = useCurrentUser();
    const form = useForm<z.infer<typeof CoachOnboardSchema>>({
        resolver :  zodResolver(CoachOnboardSchema),
        defaultValues:{
            rate: 0,
            introduction: "",
            expertises: [],
        }
    })

    const onSubmit =(values: z.infer<typeof CoachOnboardSchema>) => {
      console.log(values);
      setError('');
      setSuccess('');
        startTransition(()=>{
            onboard(values)
            .then((data)=>{
              setError(data.error)
              setSuccess(data.success)
              redirect("/coach/dashboard")
          })
          })
    }
  return (
    <CardWrapper
        headerLabel='Be a Coach!'
        backButtonHref='/'
        backButtonLabel='Go back'
    >
        <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
        <div className="space-y-4">
        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Give a brief summary of yourself! I am a personal coach! I will improve your life..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name ="rate"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Rate - ${value}</FormLabel>
              <FormControl>
                <Slider
                  disabled={isPending}
                  min={10}
                  max={100}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={(vals)=> {
                    onChange(vals[0]);
                  }}
                />
              </FormControl>
              <FormDescription>
                Move the slider to determine you rate.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expertises"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Expertise</FormLabel>
                <FormDescription>
                  What kind of help do you want to bring to your clients
                </FormDescription>
              </div>
              <div className="grid grid-flow-row grid-cols-3 space-y-2">
              {expertises.map((expertise) => (
                <FormField
                  key={expertise.id}
                  control={form.control}
                  name="expertises"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={expertise.id}
                        className="flex flex-row space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            disabled={isPending}
                            checked={field.value?.includes(expertise.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, expertise.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== expertise.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {expertise.label}
                        </FormLabel>
                      </FormItem>
                      
                    )
                  }}
                />
              ))}
              </div>
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
            Onboard
        </Button>
        </form>
        </Form>
    </CardWrapper>
  )
}
export default OnboardForm