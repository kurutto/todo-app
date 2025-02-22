import { getServerSession } from "next-auth";
import React from "react";
import { UserType } from "@/types/types";
import { redirect } from "next/navigation";
import { UserData } from "@/components/mypage/userData";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { fetchTodos } from "@/lib/fetchTodos";
import { Heading } from "@/components/ui/heading";
import { UserTodos } from "@/components/mypage/userTodos";

const Mypage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session.user as UserType;
  const todos = await fetchTodos(user.id);
  return (
    <div>
      <Heading level={1}>ユーザー情報</Heading>
      <UserData user={user} />
      <Heading level={2} className="sm:mb-0 max-sm:-mb-3">
        TODO
      </Heading>
      <UserTodos todos={todos} />
    </div>
  );
};

export default Mypage;
