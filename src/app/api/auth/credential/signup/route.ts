import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import { createId } from '@paralleldrive/cuid2';

export async function POST(req:Request, res:Response) {
  try{
    const { userId, name, email, password } = await req.json();

    const checkId = await prisma.user.findFirst({
      where:{
        id:userId
      }
    });
    if(checkId){
      return NextResponse.json({ message: "このIDは既に登録されています",
        errorId: "INVALID_ID" }, { status: 400 });
    }
    const checkEmail = await prisma.user.findFirst({
      where:{
        email:email
      }
    });
    if(checkEmail){
      return NextResponse.json({ message: "このメールアドレスは既に登録されています",
        errorId: "INVALID_EMAIL"}, { status: 400 });
    }

    const id = createId();
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.credential.create({
      data:{
        id:id,
        passwordHash:hashedPassword,
        verified: false,
      }
    })

    const paylodad = {id,userId,name,email}
    const token = jwt.sign(paylodad,process.env.JWT_SECRET!, { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!, 
      port: process.env.EMAIL_PORT!,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!
      }
    } as nodemailer.TransportOptions);

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signup/verify?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "メールアドレスの認証",
      text: `以下のリンクをクリックして認証を完了してください:\n\n ${verificationUrl}`,
    });

    return NextResponse.json({ message: "確認メールを送信しました" }, { status: 200 });
}catch(err){
  return NextResponse.json({ message: "サーバーエラー", err }, { status: 500 });
}
}