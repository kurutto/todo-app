import { getServerSession } from 'next-auth';
import React from 'react'
import { nextAuthOptions } from '../lib/next-auth/route';
import { AccountType, UserType } from '../types/types';
import { redirect } from 'next/navigation';
import { fetchTodos } from '../lib/fetchTodos';
import TodoListItem from '../components/TodoListItem';
import { statusList } from '../data/todos/status';
import UserData from '../components/UserData';

const Mypage = async() => {
    const session = await getServerSession(nextAuthOptions);
    if(!session){
      redirect('/login');
    }
    const user = session.user as UserType;
    const todos = fetchTodos(user.id)
  return (
    <div>
      <h2>ユーザー情報</h2>
      <UserData user={user} />
      <h2>TODO</h2>
      <ul>
        {(await todos).map(todo => (
          <TodoListItem key={todo.id} todo={todo} statusList={statusList} />
        ))}
      </ul>
    </div>
  )
}

export default Mypage