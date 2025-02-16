"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useRef, useState } from "react";
import { TodoType } from "@/types/types";
import { statusList } from "../../data/todos/status";
import Link from "next/link";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Heading from "../ui/heading";
import { Input } from "../ui/input";
import Block from "../ui/block";
interface TodoListProps {
  todos: TodoType[];
}
const TodoList = ({ todos }: TodoListProps) => {
  const [filterStatus, setFilterStatus] = useState([false, false, false]);
  const [todoList, setTodoList] = useState(todos);
  const filterTextRef = useRef<HTMLInputElement>(null);
  const handleChangeStatus = (checked:boolean,idx:number) => {
    const newList = [...filterStatus];
    newList[idx] = checked;
    setFilterStatus(newList);
  }
  const handleFilter = () => {
    const filter = filterStatus.map((item,idx) => item === true ? idx : null )
    console.log(filter)
    if (filter) {
      const newList = todos.filter((todo) => filter.includes(todo.status));
      setTodoList(newList);
    }
  };
  const handleFilterReset = () => {
    setTodoList(todos);
    setFilterStatus([false, false, false]);
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
      <Block className="rounded-md border p-4 shadow">
        <Heading level={3} className="mt-0">
          ステータスを選択
        </Heading>
        <div className="flex justify-between">
          <ul className="flex gap-5">
            {statusList.map((item, idx) => (
              <li
                key={idx}
                tabIndex={0}
                className="flex items-center space-x-1"
              >
                <Checkbox
                  id={`filter${idx}`}
                  data-value={idx}
                  checked={filterStatus[idx]}
                  onCheckedChange={(checked: boolean) =>
                    handleChangeStatus(checked,idx)}
                />
                <Label htmlFor={`filter${idx}`}>{item}</Label>
              </li>
            ))}
          </ul>
          <div className="flex gap-1">
            <Button variant="secondary" onClick={handleFilter}>
              実行
            </Button>
            <Button variant="secondary" onClick={handleFilterReset}>
              リセット
            </Button>
          </div>
        </div>
      </Block>
      <Block className="rounded-md border p-4 shadow">
        <Heading level={3} className="mt-0">
          用語で検索
        </Heading>
        <div className="flex justify-between gap-5">
          <Input type="text" ref={filterTextRef} />
          <div className="flex gap-1">
            <Button variant="secondary" onClick={handleTextFilter}>
              実行
            </Button>
            <Button variant="secondary" onClick={handleTextFilterReset}>
              リセット
            </Button>
          </div>
        </div>
      </Block>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>タイトル</TableHead>
            <TableHead className="w-24 text-center">ステータス</TableHead>
            <TableHead className="w-28 text-center">
              作成日
              <br />
              <span
                onClick={handleSortAscending}
                className="rounded-sm p-1 cursor-pointer"
              >
                &uarr;
              </span>
              <span
                onClick={handleSortDescending}
                className="rounded-sm p-1 cursor-pointer"
              >
                &darr;
              </span>
            </TableHead>
            <TableHead className="w-24 text-center">&nbsp;</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todoList.map((todo: TodoType) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell className="text-center">
                {statusList[todo.status]}
              </TableCell>
              <TableCell className="text-center">
                {new Date(todo.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                <Button>
                  <Link href={`/todos/${todo.id}`}>詳細</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
