import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { type Auth, createAuth } from "../lib/auth.js";

export default fp(
  async (fastify: FastifyInstance) => {
    if (!fastify.db) {
      fastify.log.warn("Database not available — skipping auth plugin");
      return;
    }

    const auth = createAuth(fastify.db);
    fastify.decorate("auth", auth);

    // Mount Better Auth handler at /api/auth/*
    fastify.route({
      method: ["GET", "POST"],
      url: "/api/auth/*",
      async handler(request: FastifyRequest, reply: FastifyReply) {
        try {
          // Construct request URL
          const url = new URL(request.url, `http://${request.headers.host}`);

          // Convert Fastify headers to standard Headers object
          const headers = new Headers();
          Object.entries(request.headers).forEach(([key, value]) => {
            if (value) headers.append(key, value.toString());
          });

          // Create Fetch API-compatible request
          const req = new Request(url.toString(), {
            method: request.method,
            headers,
            ...(request.body ? { body: JSON.stringify(request.body) } : {}),
          });

          // Process authentication request
          const response = await auth.handler(req);

          // Forward response to client
          reply.status(response.status);
          for (const [key, value] of response.headers.entries()) {
            reply.header(key, value);
          }
          return reply.send(response.body ? await response.text() : null);
        } catch (error) {
          fastify.log.error({ err: error }, "Authentication Error");
          return reply.status(500).send({
            error: "Internal authentication error",
            code: "AUTH_FAILURE",
          });
        }
      },
    });
  },
  {
    name: "auth-plugin",
    dependencies: ["db-plugin"],
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    auth: Auth;
  }
}
