'use client'
import React, { useState } from 'react'
import { TodoType } from '../types/types';
import { useRouter } from 'next/navigation';
import { statusList } from '../data/todos/status';

interface TodoProps {
  userId:string;
  todo:TodoType;
  id:string;
}
const Todo = ({userId, todo, id}:TodoProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [status, setStatus] = useState(todo.status);
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSet = async () => {
    setIsEdit(false);
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${userId}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          content: content,
          status: status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${userId}/${id}`,
      {
        method: "DELETE",
      }
    );
    router.push("/todos");
    router.refresh();
  };
  return (
    <div>
      <div>
        {isEdit ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          todo.title
        )}
      </div>
      <div>
        {isEdit ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        ) : (
          todo.content
        )}
      </div>
      <div>
        {isEdit ? (
          <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
            {statusList.map((status,idx) => (
              <option key={idx} value={idx}>{status}</option>
            ))}
          </select>
        ) : (
          statusList[todo.status]
        )}
      </div>
      {isEdit ? (
        <button onClick={handleSet}>保存</button>
      ) : (
        <button onClick={handleEdit}>編集</button>
      )}
      <button onClick={handleDelete}>削除</button>
    </div>
  )
}

export default Todo