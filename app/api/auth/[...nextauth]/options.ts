import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePass } from "@/lib/bcrypt";

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
              name: users.username,
              password: users.password,
              role: users.role,
            })
            .from(users)
            .where(eq(users.username, credentials.username));

          if (result[0] && (await comparePass(credentials.password, result[0].password))) {
            return {
              id: result[0].id.toString(),
              name: result[0].name,
              role: result[0].role,
            };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    maxAge: 30 * 60,
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
