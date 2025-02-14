'use client'
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

interface CreateTodoProps {
  userId:string;
}

const CreateTodo = ({userId}:CreateTodoProps) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const statusList = ['未完了','途中','完了'];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${userId}`, {
      method: "POST",
      body: JSON.stringify({
        title: titleRef.current!.value ? titleRef.current!.value : "",
        content: contentRef.current!.value ? contentRef.current!.value : "",
        status: Number(statusRef.current!.value)
      }),
    });
    router.push("/todos");
    router.refresh();
  };
  return (
    
    <form onSubmit={handleSubmit}>
    <label>タイトル</label>
    <div>
      <input type="text" ref={titleRef} />
    </div>
    <label>内容</label>
    <div>
      <textarea ref={contentRef}></textarea>
    </div>
    <label>ステータス</label>
    <div>
      <select ref={statusRef}>
        {statusList.map((status,idx) => (
          <option key={idx} value={idx}>{status}</option>
        ))}
      </select>
    </div>
    <button type="submit">送信</button>
  </form>
  )
}

export default CreateTodo