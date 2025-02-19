import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { UserType } from "@/types/types";
import { nextAuthOptions } from "@/lib/next-auth/route";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import NavButton from "../ui/navButton";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  return (
    <div className="flex items-center sm:px-6 sm:py-5 justify-end text-sm max-sm:px-3 max-sm:py-3">
      {!user ? (
        <>
          <NavButton link="/signup">サインアップ</NavButton>
          <NavButton link="/signin">ログイン</NavButton>
        </>
      ):(
        <>
          <NavButton link="/todos">TODO一覧</NavButton>
          <NavButton link="/api/auth/signout">ログアウト</NavButton>
          <Link href="/mypage" className="sm:ml-3 max-sm:ml-1">
            {user.image ? (
              <Image
                src={user.image}
                alt="ユーザー情報"
                width="35"
                height="35"
                className="rounded-full"
              />
            ) : (
              <FaUserCircle style={{ fontSize: "35px", color: "#1266d5" }} />
            )}
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
