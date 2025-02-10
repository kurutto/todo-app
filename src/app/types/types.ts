export interface UserType{
  id : string;
  name ?: string | null | undefined;
  email ?: string | null | undefined;
  image ?: string | null | undefined
}
export interface TodoType{
  id:number
  title ?: string
  content ?: string
  status : number
  createdAt:Date
  userId : string
}