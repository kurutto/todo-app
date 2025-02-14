import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/route";
import { redirect } from "next/navigation";
import OauthSignin from "@/components/OauthSignin";
import CredentialSignup from "@/components/CredentialSignup";
import Heading from "@/components/ui/heading";

const Signup = async () => {
  const session = await getServerSession(nextAuthOptions);
  if(session){
    redirect('/todos');
  }

  return (
    <div>
      <Heading level={1}>アカウント作成</Heading>
      <div className="mx-auto max-w-md">
        <Heading level={2}>既存のアカウントで作成</Heading>
        <OauthSignin />
        <Heading level={2}>IDとパスワードで作成</Heading>
        <CredentialSignup />
      </div>
    </div>
  );
};

export default Signup;
