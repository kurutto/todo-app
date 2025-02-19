import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/signin");
  }else{
    redirect("/todos")
  }
  
  return (
    <div>page</div>
  );
}
