"use client";
import { useTransition } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { SettingsSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader 
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
 } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { settings } from "@/actions/settings";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { testBuckets } from "@/actions/testupload";


const SettingPage = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues:{
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
    }
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    
    startTransition(()=>{
      settings(values)
      .then((data)=>{
        if (data.error){
          setError(data.error);
        }
        
        if(data.success){
          update();
          setSuccess(data.success);
        }
      })
      .catch(()=> setError("Something went wrong"));
    })
  }



  return(
    <Card className="w-[600px]">
      <CardHeader>
          <p className="text-2xl font-semibold text-center">
            ⚙️ Settings
          </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false &&(
                  <>
                    <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="JohnDoe@mail.com"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                  </>
                )}
                {user?.role === UserRole.ADMIN &&(
                <>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role"/>
                          </SelectTrigger>
                        </FormControl>
                          <SelectContent>
                            <SelectItem value={UserRole.ADMIN}>
                              Admin
                            </SelectItem>
                            <SelectItem value={UserRole.COACH}>
                              Coach
                            </SelectItem>
                            <SelectItem value={UserRole.USER}>
                              User
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </>  
              )}                  
              </div>
              <FormError message={error}/>
              <FormSuccess message={success}/>
              <Button 
                disabled={isPending}
                type="submit"
              >
                Save
              </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingPage;