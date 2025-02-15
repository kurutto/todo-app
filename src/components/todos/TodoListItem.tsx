import React from 'react'
import Link from 'next/link';
import { TodoType } from '@/types/types';

interface TodoListItemProps {
  todo:TodoType;
  statusList:string[]
}

const TodoListItem = ({todo, statusList}:TodoListItemProps) => {
  return (
    <li key={todo.id}>
      <Link href={`/todos/${todo.id}`}>
        {todo.title}:{statusList[todo.status]}(作成日：
        {new Date(todo.createdAt).toLocaleDateString()})
      </Link>
    </li>
  )
}

export default TodoListItem