export interface UserType{
  id : string;
  name ?: string | null | undefined;
  email ?: string | null | undefined;
  image ?: string | null | undefined;
  emailVerified ?:Date
  lastLogin ?: Date
}
export interface TodoType{
  id:number
  title ?: string
  content ?: string
  status : number
  createdAt:Date
  userId : string
}
export interface AccountType{
  id:string;
  userId:string;
  type:string;
  provider:string;
}