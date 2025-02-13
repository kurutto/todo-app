'use client'
import React, { FormEvent, useRef, useState } from 'react'

const CredentialSignup = () => {
    const idRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [idAlert, setIDAlert] = useState('');
    const [emailAlert, setEmailAlert] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIDAlert('');
      setEmailAlert('');
      setResponseMessage('');
      setErrorMessage('')
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signup`, {
          method: "POST",
          body: JSON.stringify({
            id:idRef.current!.value,
            name: nameRef.current!.value,
            email: emailRef.current!.value,
            password: passRef.current!.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await res.json()

        if(data.errorId === 'INVALID_ID'){
          setIDAlert(data.message);
        }
        if(data.errorEmail === 'INVALID_EMAIL'){
          setEmailAlert(data.message);
        }
        setResponseMessage(data.message)
      }catch(err){
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("不明なエラーが発生しました");
        }
      }
    }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>ID</label>
        <input type="text" ref={idRef} />
        {idAlert && <p>{idAlert}</p>}
        <label>ユーザー名</label>
        <input type="text" ref={nameRef} />
        <label>ID（メールアドレス）</label>
        <input type="email" ref={emailRef} />
        {emailAlert && <p>{emailAlert}</p>}
        <label>password</label>
        <input type="password" ref={passRef} />
        <button type="submit">送信</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default CredentialSignup