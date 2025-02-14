"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Paragraph from "./ui/paragraph";
import Block from "./ui/block";

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
type formType = z.infer<typeof formSchema>;

interface CredentialSignupProps {
  className?: string;
}

const CredentialSignup = ({ className }: CredentialSignupProps) => {
  const [responseMessage, setResponseMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: formType) => {
    setResponseMessage("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: values.id,
            name: values.name,
            email: values.email,
            password: values.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        if (data.errorId === "INVALID_ID") {
          setError("id", { message: data.message });
        } else if (data.errorId === "INVALID_EMAIL") {
          setError("email", { message: data.message });
        } else {
          setError("root", { message: "ログインに失敗しました" });
        }
      }
      if (res.ok) {
        setResponseMessage(data.message);
      }
    } catch (err) {
      setError("root", { message: "サーバーエラーが発生しました" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <Paragraph variant="error">{errors.root.message}</Paragraph>
        )}
        <Block>
          <Label htmlFor="id">ID</Label>
          <Input type="text" id="id" {...register("id")} />
          {errors.id && (
            <Paragraph variant="error">{errors.id.message}</Paragraph>
          )}
        </Block>
        <Block>
          <Label htmlFor="name">ユーザー名</Label>
          <Input type="text" id="name" {...register("name")} />
          {errors.name && (
            <Paragraph variant="error">{errors.name.message}</Paragraph>
          )}
        </Block>
        <Block>
          <Label htmlFor="email">メールアドレス</Label>
          <Input type="email" id="email" {...register("email")} />
          {errors.email && (
            <Paragraph variant="error">{errors.email.message}</Paragraph>
          )}
        </Block>
        <Block>
          <Label htmlFor="password">パスワード</Label>
          <Input type="password" id="password" {...register("password")} />
          {errors.password && (
            <Paragraph variant="error">{errors.password.message}</Paragraph>
          )}
        </Block> 
        <Button type="submit" className="mt-10 w-48 block mx-auto">
          送信
        </Button>
      </form>
      {responseMessage && <Paragraph>{responseMessage}</Paragraph>}
    </div>
  );
};

export default CredentialSignup;
