"use client";
import React, { useEffect, useState } from "react";
import { TodoType } from "../../types/types";
import { useRouter, usePathname } from "next/navigation";
import { statusList } from "../../data/todos/status";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Paragraph from "../ui/paragraph";
import Block from "../ui/block";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { todoAtom } from "@/store/atoms";
import BackButton from "../ui/backButton";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "必須項目です",
  }),
  content: z.string().max(50, {
    message: "50文字以内で入力してください",
  }),
  status: z.string(),
});

type formType = z.infer<typeof formSchema>;
interface TodoProps {
  userId: string;
  todo: TodoType;
  id: string;
}
const TodoEdit = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const [storeTodo, setStoreTodo] = useAtom(todoAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: storeTodo.title,
      content: storeTodo.content,
      status: storeTodo.status.toString(),
    },
  });
  const onSubmit = async (values: formType) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${storeTodo.userId}/${storeTodo.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          status: Number(values.status),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    router.push(`/todos/${storeTodo.id}`);
    setStoreTodo({ id: "", title: "", content: "", status: 0, userId: "" });
    router.refresh();
  };
  return (
    <div>
      {message && <Paragraph variant="error">{message}</Paragraph>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Block variant="form">
          <Label htmlFor="title">タイトル</Label>
          <Input type="text" id="title" {...register("title")} />
          {errors.title && (
            <Paragraph variant="error">{errors.title.message}</Paragraph>
          )}
        </Block>
        <Block variant="form">
          <Label htmlFor="content">内容</Label>
          <Textarea id="content" {...register("content")} />
          {errors.content && (
            <Paragraph variant="error">{errors.content.message}</Paragraph>
          )}
        </Block>
        <Block variant="form" className="flex items-center">
          <Label htmlFor="status">ステータス：</Label>
          <Select
            defaultValue={storeTodo.status.toString()}
            onValueChange={(value) => setValue("status", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={statusList[storeTodo.status]} />
            </SelectTrigger>
            <SelectContent {...register("status")}>
              {statusList.map((status, idx) => (
                <SelectItem key={idx} value={idx.toString()}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Block>
        <Block margin="lg">
          <Button type="submit" className="mr-2">
            保存
          </Button>
        </Block>
      </form>

      <Block>
          <BackButton link={`/todos/${storeTodo.id}`} className="-mb-6">
            TODO詳細
          </BackButton>
        </Block>
    </div>
  );
};

export default TodoEdit;
