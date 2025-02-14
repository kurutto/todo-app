"use client";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  id: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
    .min(6, {
      message: "6文字以上で入力してください",
    }),
  name: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .min(2, {
      message: "2文字以上で入力してください",
    }),
  email: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
    .min(8, {
      message: "8文字以上で入力してください",
    }),
});

interface CredentialSignupProps {
  className ?: string;
}

const CredentialSignup = ({className}:CredentialSignupProps) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [idAlert, setIDAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIDAlert("");
    setEmailAlert("");
    setResponseMessage("");
    setErrorMessage("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: values.id,
            name: values.name,
            email: emailRef.current!.value,
            password: passRef.current!.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.errorId === "INVALID_ID") {
        setIDAlert(data.message);
      }
      if (data.errorEmail === "INVALID_EMAIL") {
        setEmailAlert(data.message);
      }
      setResponseMessage(data.message);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
        console.log(err);
      } else {
        setErrorMessage("不明なエラーが発生しました");
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {idAlert && <p>{idAlert}</p>}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>ユーザー名</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {emailAlert && <p>{emailAlert}</p>}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="mt-10 max-w-60 w-full block mx-auto">送信</Button>
        </form>
      </Form>
      {responseMessage && <p>{responseMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CredentialSignup;
