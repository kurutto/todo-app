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
  referrer: string;
}
const TodosTable = ({
  todoList,
  handleSetTodoList,
  referrer,
}: TodosTableProps) => {
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
            <TableHead className="text-center sm:w-16 max-sm:w-12">
              &nbsp;
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-center sm:w-20 max-sm:w-14">
              Status
            </TableHead>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {todoList.map((todo: TodoType) => (
            <TableRow key={todo.id}>
              <TableCell className="text-center pl-0">
                <Button
                  asChild
                  className="h-auto leading-none sm:px-3 sm:py-2 my-[.1rem] max-sm:px-2 max-sm:py-[0.35rem] max-sm:text-xs"
                >
                  <Link
                    href={`/todos/${todo.id}`}
                    onClick={() => setReferrer(referrer)}
                  >
                    詳細
                  </Link>
                </Button>
              </TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell className="text-center">
                {statusList[todo.status]}
              </TableCell>
              <TableCell className="text-center">
                {new Date(todo.createdAt!).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { TodosTable };
