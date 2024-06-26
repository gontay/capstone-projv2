"use client"
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { RingLoader} from "react-spinners";
import { newVerification } from "@/actions/auth/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(!token) {
            setError("Missing token!");
            return;
        }
        newVerification(token)
        .then((data)=>{
            if(data.success){
                setSuccess(data.success);
                redirect('/auth/login')
            }
            setError(data.error);
        }).catch(()=>{
            setError("Something went wrong!");
        });
    },[token, success, error]);

    useEffect(()=>{
        onSubmit();
    },[onSubmit])

  return (
    <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
    >
        <div className="flex items-center w-full justify-center">
            {!success && !error && (
            <RingLoader/>
            )}
            <FormSuccess message={success}/>
            {!success && (
                <FormError message={error}/>
            )}
            
        </div>
    </CardWrapper>
  )
}

