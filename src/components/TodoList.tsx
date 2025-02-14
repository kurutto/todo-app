"use client";
import React, { useMemo, useRef, useState } from "react";
import { TodoType } from "@/types/types";
import { statusList } from "../data/todos/status";
import TodoListItem from "./TodoListItem";
interface TodoListProps {
  todos: TodoType[];
}
const TodoList = ({ todos }: TodoListProps) => {
  const [filter, setFilter] = useState<number[]>([]);
  const [todoList, setTodoList] = useState(todos);
  const filterTextRef = useRef<HTMLInputElement>(null);
  const listItemRefs = useRef<{
    [key in number]: HTMLInputElement;
  }>({});
  const convertedList = useMemo(
    () =>
      statusList.map((status, idx) => ({
        id: idx,
        refCallbackFunction: (node: HTMLInputElement | null) => {
          if (node !== null && listItemRefs.current[idx] === undefined) {
            // node が null でなく、かつ、ref が未登録の場合
            listItemRefs.current[idx] = node;
          } else {
            // node が null の場合は、対象の node を管理する必要がなくなるため削除
            delete listItemRefs.current[idx];
          }
        },
      })),
    [statusList]
  );
  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prevFilter) =>
      prevFilter.includes(Number(e.target.value))
        ? prevFilter.filter((item) => item != Number(e.target.value))
        : [Number(e.target.value), ...prevFilter]
    );
  };
  const handleFilter = () => {
    if (filter) {
      const newList = todos.filter((todo) => filter.includes(todo.status));
      setTodoList(newList);
    }
  };
  const handleFilterReset = () => {
    setTodoList(todos);
    setFilter([]);
    for (let i = 0; i < statusList.length; i++) {
      listItemRefs.current[i].checked = false;
    }
  };
  const handleTextFilter = () => {
    if (filterTextRef.current!.value) {
      const newList = todos.filter(
        (todo) =>
          todo.title?.indexOf(filterTextRef.current!.value) != -1 ||
          todo.content?.indexOf(filterTextRef.current!.value) != -1
      );
      setTodoList(newList);
    } else {
      setTodoList(todos);
    }
  };
  const handleTextFilterReset = () => {
    setTodoList(todos);
    filterTextRef.current!.value = "";
  };
  const handleSortAscending = () => {
    const newList = [...todoList];
    newList.sort((first, second) => {
      if (first.createdAt > second.createdAt) {
        return -1;
      } else if (second.createdAt > first.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
    setTodoList(newList);
  };
  const handleSortDescending = () => {
    const newList = [...todoList];
    newList.sort((first, second) => {
      if (first.createdAt < second.createdAt) {
        return -1;
      } else if (second.createdAt < first.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
    setTodoList(newList);
  };

  return (
    <div>
      <div>フィルター</div>
      <ul>
        {convertedList?.map((item, idx) => (
          <li key={idx} tabIndex={0}>
            <label>
              <input
                type="checkbox"
                value={idx}
                onChange={handleChangeFilter}
                ref={item.refCallbackFunction}
              />
              {statusList[idx]}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleFilter}>実行</button>
      <button onClick={handleFilterReset}>リセット</button>
      <div>フィルター２</div>
      <input type="text" ref={filterTextRef} />
      <button onClick={handleTextFilter}>実行</button>
      <button onClick={handleTextFilterReset}>リセット</button>
      <button onClick={handleSortAscending}>昇順にソート</button>
      <button onClick={handleSortDescending}>降順にソート</button>
      <ul>
        {todoList.map((todo: TodoType) => (
          <TodoListItem key={todo.id} todo={todo} statusList={statusList} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
