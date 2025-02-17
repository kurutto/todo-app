"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { TodoType } from "@/types/types";
import TodosTableRow from "./TodosTableRow";

interface TodosTableProps {
  todoList: TodoType[];
  handleSetTodoList:(data:TodoType[]) => void;
}
const TodosTable = ({ todoList, handleSetTodoList }: TodosTableProps) => {
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
    handleSetTodoList(newList);
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
            <TodosTableRow key={todo.id} todo={todo} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosTable;
