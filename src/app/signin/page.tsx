import React from 'react'
import OauthSignin from '../components/OauthSignin'
import CredentialSignin from '../components/CredentialSignin'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../lib/next-auth/route';
import { redirect } from 'next/navigation';

const SignIn = async() => {
  const session = await getServerSession(nextAuthOptions);
  if(session){
    redirect('/todos');
  }
  return (
    <div>
      <OauthSignin />
      <CredentialSignin />
    </div>
  )
}

export default SignIn