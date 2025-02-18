import { TodoType } from '@/types/types';
import { atom } from 'jotai'

export const todoAtom = atom<TodoType>({
  id:'', title:'', content:'', status:0, userId:''
});