"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Paragraph } from "../ui/paragraph";
import { Block } from "../ui/block";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusList } from "@/data/todos/status";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "必須項目です",
  }),
  content: z.string().max(50, {
    message: "50文字以内で入力してください",
  }),
  status: z.string(),
});
type formType = z.infer<typeof formSchema>;
interface CreateTodoProps {
  userId: string;
}

const CreateTodo = ({ userId }: CreateTodoProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "0",
    },
  });
  const onSubmit = async (values: formType) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${userId}`, {
      method: "POST",
      body: JSON.stringify({
        title: values.title,
        content: values.content,
        status: Number(values.status),
      }),
    });
    router.push("/todos");
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Block variant="form">
        <Label htmlFor="title">タイトル</Label>
        <Input type="text" id="title" {...register("title")} />
        {errors.title && (
          <Paragraph variant="error">{errors.title.message}</Paragraph>
        )}
      </Block>
      <Block variant="form">
        <Label htmlFor="content">内容</Label>
        <Textarea id="content" {...register("content")} />
        {errors.content && (
          <Paragraph variant="error">{errors.content.message}</Paragraph>
        )}
      </Block>
      <Block variant="form">
        <Label htmlFor="status">ステータス</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ステータスを選択" />
          </SelectTrigger>
          <SelectContent id="content" {...register("status")}>
            {statusList.map((status, idx) => (
              <SelectItem key={idx} value={idx.toString()}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Block>
      <Button type="submit" className="mt-10 w-48 block mx-auto">
        送信
      </Button>
    </form>
  );
};

export { CreateTodo };
