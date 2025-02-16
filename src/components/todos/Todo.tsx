"use client";
import React, { useState } from "react";
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

interface TodoProps {
  userId: string;
  todo: TodoType;
  id: string;
}
const Todo = ({ userId, todo, id }: TodoProps) => {
  const router = useRouter();
  const [preTitle, setPreTitle] = useState(todo.title);
  const [preContent, setPreContent] = useState(todo.content);
  const [preStatus, setPreStatus] = useState(todo.status.toString());
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [status, setStatus] = useState(todo.status.toString());
  const [err, setErr] = useState<{
    title?: string;
    content?: string;
    status?: string;
  }>({});
  const [isEdit, setIsEdit] = useState(false);

  const formSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: "必須項目です",
      })
      .default(title!),
    content: z
      .string()
      .min(1, {
        message: "必須項目です",
      })
      .max(50, {
        message: "50文字以内で入力してください",
      })
      .default(content!),
    status: z.string().default(status.toString()),
  });
  const handleEdit = () => {
    setIsEdit(true);
    setPreTitle(title);
    setPreContent(content);
    setPreStatus(status);
  };
  const handleCancel = () => {
    setIsEdit(false);
    setTitle(preTitle);
    setContent(preContent);
    setStatus(preStatus);
    setErr({});
  };
  const handleSet = async () => {
    const result = formSchema.safeParse({
      title: title,
      content: content,
      status: status,
    });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErr({
        title: formattedErrors.title?._errors[0],
        content: formattedErrors.content?._errors[0],
        status: formattedErrors.status?._errors[0],
      });
    } else {
      setIsEdit(false);
      setTitle(title);
      setContent(content);
      setStatus(status);
      setErr({});
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${userId}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          content: content,
          status: Number(status),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  const handleDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${userId}/${id}`, {
      method: "DELETE",
    });
    router.push("/todos");
    router.refresh();
  };
  return (
    <div>
      <Block>
        <Label htmlFor="title">タイトル</Label>
        {isEdit ? (
          <>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {err.title && <Paragraph variant="error">{err.title}</Paragraph>}
          </>
        ) : (
          <Paragraph>{title}</Paragraph>
        )}
      </Block>
      <Block>
        <Label htmlFor="content">内容</Label>
        {isEdit ? (
          <>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
            />
            {err.content && (
              <Paragraph variant="error">{err.content}</Paragraph>
            )}
          </>
        ) : (
          <Paragraph>{content}</Paragraph>
        )}
      </Block>
      <Block>
        <Label htmlFor="title">ステータス</Label>
        {isEdit ? (
          <Select value={status.toString()} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={statusList[todo.status]} />
            </SelectTrigger>
            <SelectContent id="content">
              {statusList.map((status, idx) => (
                <SelectItem key={idx} value={idx.toString()}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Paragraph>{statusList[Number(status)]}</Paragraph>
        )}
      </Block>
      {isEdit ? (
        <Block margin="lg">
          <Button onClick={handleSet} className="mr-3">
            保存
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            キャンセル
          </Button>
        </Block>
      ):(
        <Block margin="lg">
          <Button onClick={handleEdit}>編集</Button>
        </Block>
      )}

      <Block margin="sm">
        <Button variant="destructive" onClick={handleDelete}>
          削除
        </Button>
      </Block>
    </div>
  );
};

export default Todo;
