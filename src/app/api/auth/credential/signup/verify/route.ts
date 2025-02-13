import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { createId } from '@paralleldrive/cuid2';

export async function GET(req:Request, res:NextResponse) {
  try {
    const token = await req.url.split('?token=')[1];
    if (!token){
      return NextResponse.json({ message: "無効なトークン"}, { status: 400 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    const id = decoded.id;
    const userId = decoded.userId
    const name = decoded.name;
    const email = decoded.email;

    // usersテーブルにアカウントを追加
    await prisma.user.create({
      data:{
        id:userId,
        name:name,
        email:email
      }
    })
    
    // ユーザーを認証済みに変更,userIdセット
    await prisma.credential.update({
      where: {
        id: id,
      },
      data: {
        userId:userId,
        verified: true,
      }
    })
    // sessionテーブルにsessionを追加
    // const sessionToken = randomBytes(32).toString("hex");
    // const expiresAt = await new Date(Date.now() + 24 * 60 * 60 * 1000); 
    // await prisma.session.create({
    //   data:{
    //     sessionToken:sessionToken,
    //     userId:userId,
    //     expires:expiresAt
    //   }
    // })

    // const cookieStore = await cookies(); 
    // await cookieStore.set({
    //   name: "session_token",
    //   value: sessionToken,
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   path: "/",
    //   maxAge: 60 * 60 * 24, // 24時間
    // });
    
    // return NextResponse.json({ message: "認証が完了しました" }, { status: 200 });
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  } catch (error) {
    return NextResponse.json({ message: "無効または期限切れのトークン",error }, { status: 400 });
  }
}