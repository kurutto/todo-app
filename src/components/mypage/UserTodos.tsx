"use client";
import { TodoType } from "@/types/types";
import React, { useState } from "react";
import TodosTable from "../todos/TodosTable";

interface TodoListProps {
  todos: TodoType[];
}

const UserTodos = ({ todos }: TodoListProps) => {
  const [todoList, setTodoList] = useState(todos);
  const handleSetTodoList = (data: TodoType[]) => {
    setTodoList(data);
  };
  return (
    <div>
      {todos ? (
        <TodosTable todoList={todoList} handleSetTodoList={handleSetTodoList} />
      ) : null}
    </div>
  );
};

export default UserTodos;
