"use client";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const OauthSignin = () => {
  return (
    <div>
      <Button
        onClick={() => signIn('google', { callbackUrl: "/todos" })}
        variant="outline"
        className="w-full"
      ><FaGoogle />
        Googleアカウントから
      </Button>
    </div>
  );
};

export { OauthSignin };
