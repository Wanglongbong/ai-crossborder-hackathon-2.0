import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

import authConfig from "@/auth.config";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user?.password) {
          return null;
        }

        return (await bcrypt.compare(password, user.password)) ? user : null;
      },
    }),
  ],
});
