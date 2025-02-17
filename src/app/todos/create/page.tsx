import CreateTodo from "@/components/todos/CreateTodo";
import Block from "@/components/ui/block";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { UserType } from "@/types/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const CreateTodos = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;

  return (
    <div>
      <Heading level={1}>新規作成</Heading>
      <CreateTodo userId={user.id} />
      <Block>
        <Button variant="link" className="px-0"><Link href="/todos" className="flex gap-1 items-center"><IoIosArrowBack />一覧へ戻る</Link></Button>
      </Block>
    </div>
)
};

export default CreateTodos;
