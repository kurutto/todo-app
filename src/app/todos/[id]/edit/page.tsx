import { TodoEdit } from "@/components/todos/todoEdit";
import { Heading } from "@/components/ui/heading";
import React from "react";

const page = () => {
  return (
    <div>
      <Heading level={1}>TODO編集</Heading>
      <TodoEdit />
    </div>
  );
};

export default page;
