import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { UserType } from "@/types/types";
import { nextAuthOptions } from "@/lib/next-auth/route";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  return (
    <div>
      <Link href={user ? "/api/auth/signout" : "/signin"}>
        {user ? "ログアウト" : "ログイン"}
      </Link>
    </div>
  );
};

export default Header;
