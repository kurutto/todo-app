import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){
  const userId = req.url.split('todos/')[1];
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