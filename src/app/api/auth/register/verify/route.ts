import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import {cookies} from "next/headers"
import { randomBytes } from "crypto";
import { createId } from '@paralleldrive/cuid2';

export async function GET(req:Request, res:NextResponse) {
  const token = await req.url.split('?token=')[1];
  if (!token){
    return NextResponse.json({ message: "無効なトークン"}, { status: 400 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    const email = decoded.email;
    const userId = createId();

    // usersテーブルにアカウントを追加
    await prisma.user.create({
      data:{
        id:userId,
        email:email
      }
    })
    // ユーザーを認証済みに変更
    await prisma.credential.update({
      where: {
        email: email,
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
    
    return NextResponse.json({ message: "認証が完了しました" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "無効または期限切れのトークン",error }, { status: 400 });
  }
}