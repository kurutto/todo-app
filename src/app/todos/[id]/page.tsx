import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { TodoType, UserType } from "@/types/types";
import Todo from "@/components/todos/Todo";
import Heading from "@/components/ui/heading";

const TodoDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await getServerSession(nextAuthOptions);
  const user = session!.user as UserType;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${user.id}/${id}`
  );
  const todo: TodoType = await res.json();
  return (
    <div>
      <Heading level={1}>TODO詳細</Heading>
      <Todo todo={todo} />
    </div>
  );
};

export default TodoDetail;
