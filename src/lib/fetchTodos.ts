import { TodoType } from "@/types/types";


export const fetchTodos = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
    cache: "no-store",
  });
  const todos: TodoType[] = await res.json();
  return todos;
};
