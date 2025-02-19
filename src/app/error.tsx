"use client";
import { Heading } from "@/components/ui/heading";

//サーバーコンポーネントでエラーが発生した場合に自動的に表示
const Error = () => {
  return <Heading level={2}>500 Server Error</Heading>;
};

export default Error;
