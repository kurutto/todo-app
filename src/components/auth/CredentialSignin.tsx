"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paragraph } from "../ui/paragraph";
import { Block } from "../ui/block";
import { Label } from "@radix-ui/react-label";

const formSchema = z.object({
  id: z.string().min(1, { message: "必須項目です" }),
  password: z.string().min(1, { message: "必須項目です" }),
});
type formType = z.infer<typeof formSchema>;

const CredentialSignin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });
  const onSubmit = async (values: formType) => {
    await signIn("credentials", {
      id: values.id,
      password: values.password,
      callbackUrl: "/todos",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <Paragraph variant="error">{errors.root.message}</Paragraph>
        )}
        <Block variant="form">
          <Label htmlFor="id">ID</Label>
          <Input type="text" id="id" {...register("id")} />
          {errors.id && (
            <Paragraph variant="error">{errors.id.message}</Paragraph>
          )}
        </Block>
        <Block variant="form">
          <Label htmlFor="password">パスワード</Label>
          <Input type="password" id="password" {...register("password")} />
          {errors.password && (
            <Paragraph variant="error">{errors.password.message}</Paragraph>
          )}
        </Block>
        <Button type="submit" className="mt-10 w-48 block mx-auto">
          ログイン
        </Button>
      </form>
    </div>
  );
};

export { CredentialSignin };
