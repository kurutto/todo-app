'use client'
import { TodoType } from '@/types/types';
import React, { useState } from 'react'
import TodosStatusFilter from './TodosStatusFilter';
import TodosTextFilter from './TodosTextFilter';
import TodosTable from './TodosTable';

interface TodoListProps {
  todos: TodoType[];
}
const Todos = ({ todos }: TodoListProps) => {
  const [todoList, setTodoList] = useState(todos);
  const handleSetTodoList = (data:TodoType[]) => {
    setTodoList(data);
  }
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        <TodosStatusFilter handleSetTodoList={handleSetTodoList} todos={todos} />
        <TodosTextFilter handleSetTodoList={handleSetTodoList} todos={todos} />
      </div>
      <TodosTable todoList={todoList} handleSetTodoList={handleSetTodoList} />
    </div>
  )
}

export default Todos