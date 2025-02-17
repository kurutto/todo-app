import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { TodoType, UserType } from "@/types/types";
import Todo from "@/components/todos/Todo";
import Block from "@/components/ui/block";
import Heading from "@/components/ui/heading";
import BackButton from "@/components/ui/backButton";

const TodoDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session.user as UserType;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${user.id}/${id}`
  );
  const todo: TodoType = await res.json();
  return (
    <div>
      <Heading level={1}>TODO詳細</Heading>
      <Todo userId={user.id} todo={todo} id={id} />
    </div>
  );
};

export default TodoDetail;
