import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password:", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const result = await db
            .select({
              id: users.id,
              name: users.name,
              password: users.password,
              role: users.role,
            })
            .from(users)
            .where(eq(users.name, credentials.username));

          if (result.length === 1 && result[0].password === credentials.password) {
              return {...result[0], id: result[0].id.toString()};
          }
        }
        return null;
      },
    }),
  ],
  session: {
    maxAge: 10 * 60,
  },
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
