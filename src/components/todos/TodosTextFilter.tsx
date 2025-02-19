import { TodoType } from "@/types/types";
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface TodosTextFilterProps {
  todos: TodoType[];
  handleSetTodoList: (data: TodoType[]) => void;
}
const TodosTextFilter = ({
  todos,
  handleSetTodoList,
}: TodosTextFilterProps) => {
  const filterTextRef = useRef<HTMLInputElement>(null);
  const handleTextFilter = () => {
    if (filterTextRef.current!.value) {
      const newList = todos.filter(
        (todo) =>
          todo.title?.indexOf(filterTextRef.current!.value) != -1 ||
          todo.content?.indexOf(filterTextRef.current!.value) != -1
      );
      handleSetTodoList(newList);
    } else {
      handleSetTodoList(todos);
    }
  };
  const handleTextFilterReset = () => {
    handleSetTodoList(todos);
    filterTextRef.current!.value = "";
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>用語で検索</CardTitle>
      </CardHeader>
      <CardContent className="sm:flex sm:justify-between max-sm:grid gap-5">
        <Input type="text" ref={filterTextRef} />
        <div className="flex gap-2 max-sm:justify-between">
          <Button variant="secondary" onClick={handleTextFilter}>
            実行
          </Button>
          <Button variant="outline" onClick={handleTextFilterReset}>
            リセット
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { TodosTextFilter };
