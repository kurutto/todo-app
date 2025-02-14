import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){
  const userId = req.url.split("todos/")[1];
  try{
    const todos = await prisma.todo.findMany({
      where:{
        userId:userId
      }
    });
    return NextResponse.json(todos);
  }catch(err){
    return NextResponse.json(err)
  }
}
export async function POST(req:Request,res:Response){
  try{
    const userId = await req.url.split("todos/")[1];
    const { title, content, status } = await req.json();
    const todo = await prisma.todo.create({
      data:{
        title:title,
        content:content,
        status:status,
        userId:userId,
      }
    });
    return NextResponse.json({ message: "Success", todo }, { status: 201 });
  }catch(err){
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}