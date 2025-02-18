"use client"
import React from "react";
import { TodoType } from "../../types/types";
import { useRouter } from "next/navigation";
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
import Heading from "../ui/heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilValue } from "recoil";
import { todoAtomState } from "@/store/todo";
import { useAtom } from "jotai";
import { todoAtom } from "@/store/atoms";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "必須項目です",
    }),
  content: z
    .string()
    .max(50, {
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
  const [ storeTodo ] = useAtom(todoAtom);
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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${storeTodo.userId}/${storeTodo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: values.title,
        content: values.content,
        status: Number(values.status),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("../");
    router.refresh();
        
  }
  const handleDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${storeTodo.userId}/${storeTodo.id}`, {
      method: "DELETE",
    });
    router.push("/todos");
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Block variant="form">
          <Label htmlFor="title">タイトル</Label>
          <Input type="text" id="title" {...register("title")} />
          {errors.title && <Paragraph variant="error">{errors.title.message}</Paragraph>}
        </Block>
        <Block variant="form">
          <Label htmlFor="content">内容</Label>
          <Textarea id="content" {...register("content")} />
          {errors.content && <Paragraph variant="error">{errors.content.message}</Paragraph>}
        </Block>
        <Block variant="form" className="flex items-center">
          <Label htmlFor="status">
            ステータス：
          </Label>
            <Select
              defaultValue={storeTodo.status.toString()}
              onValueChange={(value) => setValue("status", value)}>
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
      </div>
      <Block margin="lg" className="flex justify-between">
        <Button type="submit">保存</Button>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="hover:bg-[#ef4444] hover:text-white"
        >
          削除
        </Button>
      </Block>
    </form>
  );
};

export default TodoEdit;
