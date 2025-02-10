'use client'
import React, { FormEvent, useRef } from "react";

const page = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current!.value,
        password: passRef.current!.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>mail</label>
      <input type="email" ref={emailRef} />
      <label>password</label>
      <input type="text" ref={passRef} />
      <button type="submit">送信</button>
    </form>
  );
};

export default page;
