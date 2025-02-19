import React from "react";
import { OauthSignin } from "@/components/auth/oAuthSignin";
import { CredentialSignin } from "@/components/auth/credentialSignin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { nextAuthOptions } from "@/lib/next-auth/route";
import { Paragraph } from "@/components/ui/paragraph";
import { Button } from "@/components/ui/button";
import { Block } from "@/components/ui/block";
import Link from "next/link";

const SignIn = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/todos");
  }
  return (
    <div>
      <Heading level={1}>ログイン</Heading>
      <div className="mx-auto max-w-md">
        <OauthSignin />
        <Heading level={2}>IDとパスワードでログイン</Heading>
        <CredentialSignin />
        <Block className="text-center">
          <Button variant="link">
            <Link href="/signup">アカウント作成はこちら</Link>
          </Button>
        </Block>
      </div>
    </div>
  );
};

export default SignIn;
