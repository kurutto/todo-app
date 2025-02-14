import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

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
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  } catch (error) {
    return NextResponse.json({ message: "無効または期限切れのトークン",error }, { status: 400 });
  }
}