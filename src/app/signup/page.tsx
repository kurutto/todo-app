import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/route";
import { redirect } from "next/navigation";
import OauthSignin from "../components/OauthSignin";
import CredentialSignup from "../components/CredentialSignup";

const Signup = async () => {
  const session = await getServerSession(nextAuthOptions);
  if(session){
    redirect('/todos');
  }

  return (
    <div>
      <h2>新規登録</h2>
        <OauthSignin />
        <CredentialSignup />
    </div>
  );
};

export default Signup;
