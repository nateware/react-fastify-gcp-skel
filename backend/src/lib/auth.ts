import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authSchema from "../db/auth-schema.js";
import type { DbClient } from "../plugins/db.js";

/**
 * Creates the Better Auth instance.
 * Called after the DB plugin decorates fastify.db.
 */
export function createAuth(db: DbClient) {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
    basePath: "/api/auth",
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: authSchema,
    }),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      apple: {
        clientId: process.env.APPLE_CLIENT_ID as string,
        clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      },
    },
    trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
  });
}

export type Auth = ReturnType<typeof createAuth>;
