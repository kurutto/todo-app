'use client'
import React, { useState } from "react";
import { UserType } from "../types/types";

interface UserDataProps {
  user: UserType;
}
const UserData = ({ user }: UserDataProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputId, setInputId] = useState(user.id);
  const [inputName, setInputName] = useState(user.name);
  const [idAlert, setIDAlert] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSet = async () => {
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
      if (data.errorId === "INVALID_ID") {
        setIDAlert(data.message);
      }
      setResponseMessage(data.message);
      setIsEdit(false);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("不明なエラーが発生しました");
      }
    }
  };
  return (
    <div>
      <div>ユーザーID</div>
      <div>
        {isEdit ? (
          <>
            <input
              type="text"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            {idAlert && <p>{idAlert}</p>}
          </>
        ) : (
          inputId
        )}
      </div>
      <div>ユーザー名</div>
      <div>
        {isEdit && inputName ? (
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        ) : (
          inputName
        )}
      </div>
      <div>最終ログイン日</div>
      <div>{user.lastLogin?.toLocaleDateString()}</div>
      {isEdit ? (
        <button onClick={handleSet}>保存</button>
      ) : (
        <button onClick={handleEdit}>編集</button>
      )}

      {responseMessage && <p>{responseMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UserData;
