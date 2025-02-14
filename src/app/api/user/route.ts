import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
  try{
    const { previousId, newId, name } = await req.json();
    const user = await prisma.user.findFirst({where:{id:newId}});
    if(user){
      return NextResponse.json({ message: "このIDは既に登録されています",
        errorId: "INVALID_ID" }, { status: 400 })
    }
    await prisma.user.update({where:{id:previousId},data:{id:newId,name:name}})
    return NextResponse.json({ message: "登録が完了しました" }, { status: 200 });
  }catch(err){
    return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
  }
}