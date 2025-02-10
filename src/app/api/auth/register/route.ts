import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

export async function POST(req:Request, res:Response) {
  try{
    const { email, password } = await req.json();

    const existingUser = await prisma.credential.findFirst({
      where:{
        email:email
      }
    });
    if(existingUser){
      return NextResponse.json({ message: "このメールアドレスは既に登録されています"}, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.credential.create({
      data:{
        email:email,
        password_hash:hashedPassword,
        verified: false
      }
    })
    const token = jwt.sign({ email },process.env.JWT_SECRET!, { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!, 
      port: process.env.EMAIL_PORT!,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!
      }
    } as nodemailer.TransportOptions);

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/register/verify?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "メールアドレスの認証",
      text: `以下のリンクをクリックして認証を完了してください:\n\n ${verificationUrl}`,
    });
    return NextResponse.json({ message: "確認メールを送信しました" }, { status: 200 });
}catch(err){
  return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });

}
}