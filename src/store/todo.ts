import { TodoType } from "@/types/types";
import { atom } from "recoil";

export const todoAtomState = atom<TodoType>({
  key: "todoAtom",
  default: {id:'', title:'', content:'', status:0, userId:''}
});