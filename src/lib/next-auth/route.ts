import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import prisma from "../prisma";

export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // 入力された値をUserのデータベースと比較するapiを作る
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signin`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, trigger, user, account }) {

      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.emailVerified = user.emailVerified ? user.emailVerified : null;
        token.jat = Math.floor(Date.now() / 1000);
        await prisma.user.update({ where: { id: token.sub as string },data:{lastLogin:new Date(token.jat as number * 1000) } });
      }
      if (account) {
        const dbUser = await prisma.user.findUnique({ where: { id: token.sub as string } });
        if (dbUser) {
          token.emailVerified = dbUser.emailVerified;
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      if(!session.user) return session
      session.user.id = token.sub ? token.sub : '';
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.emailVerified = token.emailVerified as Date | null;
      session.user.lastLogin = new Date(token.jat as number * 1000);
      return session;
    },
  },
};
