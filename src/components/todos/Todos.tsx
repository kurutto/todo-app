"use client";
import { TodoType } from "@/types/types";
import React, { useState } from "react";
import {TodosStatusFilter} from "./todosStatusFilter";
import {TodosTextFilter} from "./todosTextFilter";
import {TodosTable} from "./todosTable";

interface TodoListProps {
  todos: TodoType[];
}
const Todos = ({ todos }: TodoListProps) => {
  const [todoList, setTodoList] = useState(todos);
  const handleSetTodoList = (data: TodoType[]) => {
    setTodoList(data);
  };
  return (
    <div>
      <div className="grid sm:gap-5 lg:grid-cols-2 max-sm:gap-3">
        <TodosStatusFilter
          handleSetTodoList={handleSetTodoList}
          todos={todos}
        />
        <TodosTextFilter handleSetTodoList={handleSetTodoList} todos={todos} />
      </div>
      <TodosTable
        todoList={todoList}
        handleSetTodoList={handleSetTodoList}
        referrer="todos"
      />
    </div>
  );
};

export { Todos };
