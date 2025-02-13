import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // `id` プロパティを追加
      name?: string | null;
      email?: string | null;
      image?: string | null;
      emailVerified?: Date | null;
      lastLogin?: Date | null;
    };
  }

  interface User {
    id: string; // ユーザーにも `id` を追加
    name?: string;
    email?: string;
    image?: string;
    emailVerified?: Date;
    lastLogin?: Date;
  }
}