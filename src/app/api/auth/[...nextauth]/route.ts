import { LoginUsers } from "@/lib/firebase/services";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXT_PUBLIC_API_KEY,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const users: any = await LoginUsers({ email, password });
        console.log(users)
        if (users) {
          const passwordMatch = await bcrypt.compare(password, users.password);
          if (passwordMatch) {
            return { ...users, id: users.id };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile }: any) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.username = user.username;
        token.id = user.id;
        token.role = user.role
        token.phone = user.phone
        token.expires = expires.getTime() / 1000;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("username" in token) {
        session.user.name = token.username;
      }
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ('role' in token) {
        session.user.role = token.role
      }
      if('phone' in token) {
        session.user.phone = token.phone
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };