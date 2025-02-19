import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { UserType } from "@/types/types";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { fetchTodos } from "@/lib/fetchTodos";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Todos } from "@/components/todos/todos";

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  const todos = await fetchTodos(user.id);
  return (
    <div>
      <div className="relative">
        <Heading level={1}>TODO一覧</Heading>
        <div className="sm:absolute sm:top-0 sm:right-0 max-sm:text-right max-sm:-mt-3 max-sm:mb-3">
          <Button asChild>
            <Link href="/todos/create">TODO作成</Link>
          </Button>
        </div>
      </div>
      <Todos todos={todos} />
    </div>
  );
};

export default page;
