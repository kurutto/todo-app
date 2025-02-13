import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/route";
import Link from "next/link";
import { UserType } from "../types/types";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  console.log("session情報", session);
  return (
    <div>
      <Link href={user ? "/api/auth/signout" : "/signin"}>
        {user ? "ログアウト" : "ログイン"}
      </Link>
    </div>
  );
};

export default Header;
