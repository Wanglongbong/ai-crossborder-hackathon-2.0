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

const DEMO_ACCOUNT = {
  id: "demo-user",
  name: "Demo User",
  email: "demo@thecanvas.local",
  password: "Demo123!",
};

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

        if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
          return {
            id: DEMO_ACCOUNT.id,
            name: DEMO_ACCOUNT.name,
            email: DEMO_ACCOUNT.email,
          };
        }

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
