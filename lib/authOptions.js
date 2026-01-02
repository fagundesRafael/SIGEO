// lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User from "../models/User";
import { dbConnect } from "./dbConnect";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seuemail@exemplo.com" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        return {
          id: user._id.toString(),
          nome: user.nome,
          email: user.email,
          is_admin: user.is_admin,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "strict", // 🔥 ALTERADO para maior persistência
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // 🔥 Fundamental para JWT

  debug: true, // 🔥 Ativa logs detalhados
};
