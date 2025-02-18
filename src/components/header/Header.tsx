import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { UserType } from "@/types/types";
import { nextAuthOptions } from "@/lib/next-auth/route";
import Image from "next/image";
import { FaUserCircle } from 'react-icons/fa';
import { Button } from "../ui/button";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  console.log(user);
  return (
    <div className="flex items-center px-6 py-5 justify-end text-sm">
      {!user && <Button variant="link"><Link href='/signup'>サインアップ</Link></Button>}
      <Button variant="link"><Link href={user ? "/api/auth/signout" : "/signin"}>
        {user ? "ログアウト" : "ログイン"}
      </Link></Button>
      {user && <><Button variant="link"><Link href='/todos'>TODO一覧</Link></Button><Link href='/mypage' className="ml-5">{user.image ? <Image src={user.image} alt="ユーザー情報" width='35' height='35' className="rounded-full" /> : <FaUserCircle className="ml-5" style={{ fontSize: '35px', color: 'gray' }} />}</Link></>}
      
    </div>
  );
};

export default Header;
