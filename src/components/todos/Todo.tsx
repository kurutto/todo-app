"use client";
import React from "react";
import { TodoType } from "../../types/types";
import { useRouter } from "next/navigation";
import { statusList } from "../../data/todos/status";
import { Button } from "@/components/ui/button";
import { Paragraph } from "../ui/paragraph";
import { Heading } from "../ui/heading";
import { useAtom } from "jotai";
import { referrerAtom, todoAtom } from "@/store/atoms";
import { Block } from "../ui/block";
import { BackButton } from "../ui/backButton";

interface TodoProps {
  todo: TodoType;
}
const Todo = ({ todo }: TodoProps) => {
  const router = useRouter();
  const [referrer] = useAtom(referrerAtom);
  const [, setStoreTodo] = useAtom(todoAtom);

  const handleEdit = () => {
    setStoreTodo({
      id: todo.id,
      title: todo.title,
      content: todo.content,
      status: todo.status,
      userId: todo.userId,
    });
    router.push(`/todos/${todo.id}/edit`);
  };
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.userId}/${todo.id}`,
      {
        method: "DELETE",
      }
    );
    if (referrer && referrer === "mypage") {
      router.push("/mypage");
    } else {
      router.push("/todos");
    }

    router.push("/todos");
    router.refresh();
  };
  return (
    <div>
      <Heading level={3}>タイトル</Heading>
      <Paragraph>{todo.title}</Paragraph>
      <Heading level={3}>内容</Heading>
      <Paragraph>{todo.content ? todo.content : "　"}</Paragraph>
      <Heading level={3}>ステータス</Heading>
      <Paragraph>{statusList[todo.status]}</Paragraph>
      <Block margin="lg" className="max-sm:text-center">
        <Button onClick={handleEdit} className="mr-2">
          編集
        </Button>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="hover:bg-[hsl(var(--destructive))] hover:border-transparent hover:text-[hsl(var(--destructive-foreground))]"
        >
          削除
        </Button>
      </Block>
      {referrer && referrer === "mypage" && (
        <Block>
          <BackButton link="/mypage">マイページへ戻る</BackButton>
        </Block>
      )}
      {referrer && referrer === "todos" && (
        <Block>
          <BackButton link="/todos">TODO一覧へ戻る</BackButton>
        </Block>
      )}
    </div>
  );
};

export { Todo };
