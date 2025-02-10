import React from 'react'
import { TodoType, UserType } from '../types/types'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../lib/next-auth/route';
import Link from 'next/link';
import TodoList from '../components/TodoList';

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserType;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${user.id}`,{cache:'no-store'});
  const todos:TodoType[] = await res.json();
  return (
    <div>
      <TodoList todos={todos} />
      <Link href='/todos/create'>新規作成</Link>
    </div>
  )
}

export default page