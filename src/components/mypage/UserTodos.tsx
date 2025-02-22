"use client";
import { TodoType } from "@/types/types";
import React, { useState } from "react";
import {TodosTable} from "../todos/todosTable";

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
        <TodosTable
          todoList={todoList}
          handleSetTodoList={handleSetTodoList}
          referrer={"mypage"}
        />
      ) : null}
    </div>
  );
};

export { UserTodos };
