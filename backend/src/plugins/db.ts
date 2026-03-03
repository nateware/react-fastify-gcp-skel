import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import * as authSchema from "../db/auth-schema.js";
import { createPool } from "../db/connect.js";
import * as appSchema from "../db/schema.js";

const schema = { ...authSchema, ...appSchema };

export type DbClient = NodePgDatabase<typeof schema>;

export default fp(
  async (fastify: FastifyInstance) => {
    if (!process.env.DATABASE_URL && !process.env.CLOUDSQL_CONNECTION) {
      fastify.log.warn("DATABASE_URL / CLOUDSQL_CONNECTION not set — skipping database connection");
      return;
    }

    const { pool, cleanup } = await createPool();

    await pool.query("SELECT 1");

    const db = drizzle(pool, { schema });

    fastify.decorate("db", db);

    fastify.addHook("onClose", async () => {
      await cleanup();
    });
  },
  { name: "db-plugin" },
);

declare module "fastify" {
  export interface FastifyInstance {
    db: DbClient;
  }
}
