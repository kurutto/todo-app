"use client";
import { useSession } from "next-auth/react";
import { UserType } from "@/types/types";
import React, { useState } from "react";
import Heading from "../ui/heading";
import { Button } from "../ui/button";
import Paragraph from "../ui/paragraph";
import Block from "../ui/block";
import { Input } from "../ui/input";
import { z } from "zod";

interface UserDataProps {
  user: UserType;
}
const UserData = ({ user }: UserDataProps) => {
  const { update } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const [inputId, setInputId] = useState(user.id);
  const [inputName, setInputName] = useState(user.name);
  const [preData, setPreData] = useState([user.id, user.name]);
  const [idAlert, setIDAlert] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [err, setErr] = useState<{
    id?: string;
    name?: string;
  }>({});
  const formSchema = z.object({
    id: z
      .string({
        required_error: "必須項目です",
        invalid_type_error: "入力値に誤りがります",
      })
      .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
      .min(6, {
        message: "6文字以上で入力してください",
      }),
    name: z
      .string({
        required_error: "必須項目です",
        invalid_type_error: "入力値に誤りがります",
      })
      .min(2, {
        message: "2文字以上で入力してください",
      }),
  });
  const handleEdit = () => {
    setIsEdit(true);
    setPreData([inputId, inputName]);
  };
  const handleSet = async () => {
    const result = formSchema.safeParse({
      id: inputId,
      name: inputName,
    });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErr({
        id: formattedErrors.id?._errors[0],
        name: formattedErrors.name?._errors[0],
      });
    } else {
      setIDAlert("");
      setResponseMessage("");
      setErrorMessage("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          method: "POST",
          body: JSON.stringify({
            previousId: user.id,
            newId: inputId,
            name: inputName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if(!res.ok){
          if (data.errorId === "INVALID_ID") {
            setIDAlert(data.message);
          }else {
            setErrorMessage("変更に失敗しました");
          }
        }
        if(res.ok){
          setIsEdit(false);
          setResponseMessage(data.message);
          await update({ id: inputId, name: inputName });
        }
      } catch (err) {
          setErrorMessage("サーバーエラーが発生しました");
      }
    }
  };
  const handleCancel = async () => {
    setIsEdit(false);
    setInputId(preData[0]!);
    setInputName(preData[1]);
    setErr({});
    setIDAlert('');
  };
  return (
    <div>
      <div className="flex items-center">
        <Heading level={3} className="w-36">
          ユーザーID
        </Heading>
        <div className="flex-1">
          {isEdit ? (
            <>
              <Input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
            </>
          ) : (
            <Paragraph>{inputId}</Paragraph>
          )}
        </div>
      </div>
      <div className="ml-36 mb-2">
      {err.id && <Paragraph variant="error">{err.id}</Paragraph>}
      {idAlert && <Paragraph variant="error">{idAlert}</Paragraph>}
      </div>
      <div className="flex items-center">
        <Heading level={3} className="w-36">
          ユーザー名
        </Heading>
        <div className="flex-1">
          {isEdit && inputName ? (
            <Input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          ) : (
            <Paragraph>{inputName}</Paragraph>
          )}
        </div>
      </div>
      {err.name && <Paragraph variant="error">{err.name}</Paragraph>}
      <div className="flex items-center">
        <Heading level={3} className="w-36">
          最終ログイン日
        </Heading>
        <div>
          <Paragraph>{user.lastLogin?.toLocaleDateString()}</Paragraph>
        </div>
      </div>
      <Block>
        {isEdit ? (
          <>
            <Button variant="outline" onClick={handleSet}>
              保存
            </Button>
            <Button variant="link" onClick={handleCancel}>
              キャンセル
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={handleEdit}>
            編集
          </Button>
        )}
      </Block>
      {responseMessage && <Block margin="sm"><Paragraph>{responseMessage}</Paragraph></Block>}
      {errorMessage && <Block margin="sm"><Paragraph variant="error">{errorMessage}</Paragraph></Block>}
    </div>
  );
};

export default UserData;
