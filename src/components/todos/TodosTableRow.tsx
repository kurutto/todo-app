import React from 'react'
import Link from 'next/link';
import { TodoType } from '@/types/types';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from '../ui/button';
import { statusList } from '@/data/todos/status';

interface TodoListItemProps {
  todo:TodoType;
}

const TodosTableRow = ({todo}:TodoListItemProps) => {
  return (
    <TableRow key={todo.id}>
      <TableCell>{todo.title}</TableCell>
      <TableCell className="text-center">
        {statusList[todo.status]}
      </TableCell>
      <TableCell className="text-center">
        {new Date(todo.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-center">
        <Button asChild>
          <Link href={`/todos/${todo.id}`}>詳細</Link>
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default TodosTableRow