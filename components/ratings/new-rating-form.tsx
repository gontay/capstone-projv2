'use client'
import React, { useState, useTransition } from 'react'
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '../ui/button'
import { RatingSchema } from '@/schemas';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import RatingCardWrapper from './rating-card-wrapper';
import { useCurrentUser } from '@/hooks/use-current-user';
import { CreateRating } from '@/actions/ratings/createRating';
import { useRouter } from 'next/navigation';

interface NewRatingFormProps{
  coachId?: string
}

const NewRatingForm = ({coachId}: NewRatingFormProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [ isPending, startTransition] =  useTransition();
    const [wordCount, setWordCount]= useState<number>(0);
    const router = useRouter()
    const form = useForm<z.infer<typeof RatingSchema>>({
        resolver: zodResolver(RatingSchema),
        defaultValues:{
            rating: 0,
            review: "",
        }
    })
    const onSubmit = (values: z.infer<typeof RatingSchema>) =>{
        console.log(
          "coachId",coachId,
          "values",values)
          if(coachId){
            startTransition(()=>{
              CreateRating(values, coachId)
              .then((data)=>{
                  setError(data.error)
                  setSuccess(data.success)
                  router.refresh()
              });
          })
          }
    }
  return (
    <RatingCardWrapper
        headerLabel='Review'
    >
      <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
        <div className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Rating</FormLabel>
              <FormDescription>Give us a rating on a scale of 1 to 5 on how well you were coached [1 being very bad to 5 being excellent]</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={1} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      1
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={2} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      2
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={3} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      3
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={4} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      4
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={5} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      5
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field: {onChange, value} }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Review...."
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
        </div>
        <FormError message={error}/>
        <FormSuccess message={success}/>
        <Button
            disabled={isPending}
            type="submit"
            className="w-full"
        >
            Submit
        </Button>
        </form>
        </Form>
      </RatingCardWrapper>
  )
}

export default NewRatingForm 