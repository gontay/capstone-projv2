'use client'
import * as z from "zod";
import React, { useState, useTransition } from 'react'
import JournalCardWrapper from './journal-card-wrapper'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { JournalEntrySchema } from "@/schemas";
import { Textarea } from "../ui/textarea";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { CreateEntry } from "@/actions/journal/createEntry";

const NewEntryForm = () => {

    const date = new Date()
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [ isPending, startTransition] =  useTransition();
    const [wordCount, setWordCount]= useState<number>(0);
    const form = useForm<z.infer<typeof JournalEntrySchema>>({
        resolver: zodResolver(JournalEntrySchema),
        defaultValues:{
            title: "Entry-"+ date.toLocaleString(),
            content: "",
            privacy: false
        }
    })

    const onSubmit = (values: z.infer<typeof JournalEntrySchema>) =>{
        console.log(values)
        startTransition(()=>{
            CreateEntry(values)
            .then((data)=>{
                setError(data.error)
                setSuccess(data.success)
            });
        })
    }
  return (
    <JournalCardWrapper
        headerLabel='New Entry'
    >
           <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
        <div className="space-y-4">
        <FormField
            control={form.control}
            name="title"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        disabled={isPending}
                        placeholder="something@example.com"
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field: {onChange, value} }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Things I can work on...."
                  className="resize-none"
                  defaultValue={value}
                  onChange={(e)=> {
                    onChange(e.target.value)
                    setWordCount(e.target.value.length)
                  }}
                />
              </FormControl>
              <p>{wordCount}/1000 Char</p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Private Entry</FormLabel>
                    <FormDescription>
                      Private entries will not be visible on your public profile.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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
            Add Entry
        </Button>
        </form>
        </Form>
    </JournalCardWrapper>
  )
}

export default NewEntryForm