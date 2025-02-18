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
      <div className="relative">
        <Heading level={1}>TODO一覧</Heading>
        <div className="sm:absolute sm:top-0 sm:right-0 max-sm:text-right max-sm:-mt-6 max-sm:mb-6"><Button asChild variant="secondary"><Link href="/todos/create">新規作成</Link></Button></div>
      </div>
      <Todos todos={todos} />
    </div>
  );
};

export default page;
