"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import React from "react";
import { TodoType } from "@/types/types";
import { statusList } from "@/data/todos/status";
import { Button } from "../ui/button";
import Link from "next/link";
import { referrerAtom } from "@/store/atoms";
import { useAtom } from "jotai";

interface TodosTableProps {
  todoList: TodoType[];
  handleSetTodoList: (data: TodoType[]) => void;
  referrer:string
}
const TodosTable = ({ todoList, handleSetTodoList, referrer }: TodosTableProps) => {
  const [, setReferrer] = useAtom(referrerAtom);
  const handleSortAscending = () => {
    const newList = [...todoList];
    newList.sort((first, second) => {
      if (first.createdAt! > second.createdAt!) {
        return -1;
      } else if (second.createdAt! > first.createdAt!) {
        return 1;
      } else {
        return 0;
      }
    });
    handleSetTodoList(newList);
  };
  const handleSortDescending = () => {
    const newList = [...todoList];
    newList.sort((first, second) => {
      if (first.createdAt! < second.createdAt!) {
        return -1;
      } else if (second.createdAt! < first.createdAt!) {
        return 1;
      } else {
        return 0;
      }
    });
    handleSetTodoList(newList);
  };

  return (
    <div>
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
                {new Date(todo.createdAt!).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                <Button asChild>
                  <Link href={`/todos/${todo.id}`} onClick={() => setReferrer(referrer)}>詳細</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosTable;
