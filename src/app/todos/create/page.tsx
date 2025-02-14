import CreateTodo from "@/components/CreateTodo";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { UserType } from "@/types/types";
import { getServerSession } from "next-auth";
import React from "react";

const CreateTodos = async() => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;

  return (
    <CreateTodo userId={user.id} />
  );
};

export default CreateTodos;
