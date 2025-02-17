import CreateTodo from "@/components/todos/CreateTodo";
import BackButton from "@/components/ui/backButton";
import Block from "@/components/ui/block";
import Heading from "@/components/ui/heading";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { UserType } from "@/types/types";
import { getServerSession } from "next-auth";
import React from "react";

const CreateTodos = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;

  return (
    <div>
      <Heading level={1}>TODO新規作成</Heading>
      <CreateTodo userId={user.id} />
      <Block>
        <BackButton link="/todos">一覧へ戻る</BackButton>
      </Block>
    </div>
  );
};

export default CreateTodos;
