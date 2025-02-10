'use client'
import React, { useState } from 'react'
import { TodoType } from '../types/types';
import { useRouter } from 'next/navigation';

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
  const statusList = ['未完了','途中','完了'];
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSet = () => {
    setIsEdit(false);
    const updateTodo = async () => {
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
    updateTodo();
  };
  const handleDelete = () => {
    const deleteTodo = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/${userId}/${id}`,
        {
          method: "DELETE",
        }
      );
    };
    deleteTodo();
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
          title
        )}
      </div>
      <div>
        {isEdit ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        ) : (
          content
        )}
      </div>
      <div>
        {isEdit ? (
          <select onChange={(e) => setStatus(Number(e.target.value))}>
            {statusList.map((status,idx) => (
              <option key={idx} value={idx}>{status}</option>
            ))}
          </select>
        ) : (
          statusList[status]
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