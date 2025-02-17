import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { UserType } from "@/types/types";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { fetchTodos } from "@/lib/fetchTodos";
import { Button } from "@/components/ui/button";
import Block from "@/components/ui/block";
import Heading from "@/components/ui/heading";
import Todos from "@/components/todos/Todos";

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  const todos = await fetchTodos(user.id);
  return (
    <div>
      <Heading level={1}>TODO一覧</Heading>
      <Todos todos={todos} />
      <Block margin="lg" className="text-center">
      <Button asChild variant="outline"><Link href="/todos/create">新規作成</Link></Button>
      </Block>
    </div>
  );
};

export default page;
