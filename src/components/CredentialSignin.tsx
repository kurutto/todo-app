'use client'
import { signIn } from 'next-auth/react';
import React, { useRef } from 'react'

const CredentialSignin = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      id:idRef.current!.value,
      password:passwordRef.current!.value,
      callbackUrl: '/todos'
    });
  }
  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <label>ID</label>
        <input type='text' ref={idRef} />
        <label>パスワード</label>
        <input type='password' ref={passwordRef} />
        <button type='submit'>ログイン</button>
      </form>
    </div>
  )
}

export default CredentialSignin