import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response) {
  try{
  const { email, password } = await req.json();
  console.log('メール',email)
  const existingUser = await prisma.credential.findFirst({
    where:{
      email:email,
    }
  });
  if(!existingUser){
    return NextResponse.json({ message: "このメールアドレスは登録されていません"}, { status: 400 });

  }
  const hashedPassword = await existingUser.password_hash;
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if(isMatch){
    const user = await prisma.user.findFirst({
      where:{
        id:existingUser.userId!,
      }
    })
    console.log(user);
    return NextResponse.json(user, { status: 201 });
  }else{

    return NextResponse.json({ message: "パスワードが間違っています"}, { status: 400 });
  }}catch(err){
    return NextResponse.json(err);
  }

}