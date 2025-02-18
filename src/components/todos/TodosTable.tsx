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
            <TableHead>Title</TableHead>
            <TableHead className="text-center sm:w-20 max-sm:w-14">Status</TableHead>
            <TableHead className="text-center sm:w-28 max-sm:w-20 ">
              Date
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
            <TableHead className="text-center sm:w-20 max-sm:w-14">&nbsp;</TableHead>
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
                <Button asChild className="max-sm:p-2 max-sm:text-xs max-sm:leading-none max-sm:h-auto">
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
