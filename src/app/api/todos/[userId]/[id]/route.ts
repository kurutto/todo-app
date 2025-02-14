import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){
  const ids = req.url.split('todos/')[1].split('/');
  const userId = ids[0]
  const id = ids[1]
  try{
    const todo = await prisma.todo.findFirst({
      where:{
        userId:userId,
        id:id
      }
    });
    return NextResponse.json(todo);
  }catch(err){
    return NextResponse.json(err)
  }
}
export async function PUT(req:Request){
  const ids = req.url.split('todos/')[1].split('/');
  const userId = ids[0]
  const id = ids[1]
  const {title, content, status} = await req.json();
  try{
    const todo = await prisma.todo.update({
      where:{
        userId:userId,
        id:id
      },
      data:{
        title:title,
        content:content,
        status:status
      }
    });
    return NextResponse.json(todo);
  }catch(err){
    return NextResponse.json(err)
  }
}
export async function DELETE(req:Request){
  const ids = req.url.split('todos/')[1].split('/');
  const userId = ids[0]
  const id = ids[1]
  try{
    const todo = await prisma.todo.delete({
      where:{
        userId:userId,
        id:id
      }
    });
    return NextResponse.json(todo);
  }catch(err){
    return NextResponse.json(err)
  }
}