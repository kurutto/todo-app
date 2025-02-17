import { TodoType } from '@/types/types';
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { statusList } from '@/data/todos/status';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface TodosStatusFilterProps {
  todos:TodoType[];
  handleSetTodoList:(data:TodoType[]) => void;
}

const TodosStatusFilter = ({todos,handleSetTodoList}:TodosStatusFilterProps) => {
  const [filterStatus, setFilterStatus] = useState([false, false, false]);

  const handleChangeStatus = (checked:boolean,idx:number) => {
    const newList = [...filterStatus];
    newList[idx] = checked;
    setFilterStatus(newList);
  }
  const handleFilter = () => {
    const filter = filterStatus.map((item,idx) => item ? idx : null )
    if (filter) {
      const newList = todos.filter((todo) => filter.includes(todo.status));
      handleSetTodoList(newList);
    }
  };
  const handleFilterReset = () => {
    handleSetTodoList(todos);
    setFilterStatus([false, false, false]);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>ステータスを選択</CardTitle>
      </CardHeader>
      <CardContent className="md:flex md:justify-between max-md:grid gap-5">
        <div className="grid w-full items-center gap-4">
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
        </div>
        <div className="flex gap-2">
          <Button variant='secondary' onClick={handleFilter}>実行</Button>
          <Button variant="secondary" onClick={handleFilterReset}>リセット</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TodosStatusFilter