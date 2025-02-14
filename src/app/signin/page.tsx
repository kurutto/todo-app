import React from 'react'
import OauthSignin from '@/components/OauthSignin';
import CredentialSignin from '@/components/CredentialSignin';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Heading from '@/components/ui/heading';
import { nextAuthOptions } from '@/lib/next-auth/route';

const SignIn = async() => {
  const session = await getServerSession(nextAuthOptions);
  if(session){
    redirect('/todos');
  }
  return (
    <div>
      <Heading level={1}>ログイン</Heading>
      <div className="mx-auto max-w-md">
        <Heading level={2}>既存のアカウントでログイン</Heading>
        <OauthSignin />
        <Heading level={2}>IDとパスワードでログイン</Heading>
        <CredentialSignin />
      </div>
    </div>
  )
}

export default SignIn