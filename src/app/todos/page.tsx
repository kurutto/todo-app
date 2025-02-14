import React from 'react'
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import TodoList from '@/components/TodoList';
import { UserType } from '@/types/types';
import { nextAuthOptions } from '@/lib/next-auth/route';
import { fetchTodos } from '@/lib/fetchTodos';

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  const todos = await fetchTodos(user.id)
  return (
    <div>
      <TodoList todos={todos} />
      <Link href='/todos/create'>新規作成</Link>
    </div>
  )
}

export default page