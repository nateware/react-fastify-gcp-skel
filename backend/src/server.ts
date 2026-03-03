import Fastify from "fastify";
import app from "./app.js";

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
});

await fastify.register(app);

const port = Number(process.env.PORT || process.env.FASTIFY_PORT || 3001);
const host = process.env.FASTIFY_ADDRESS || "127.0.0.1";

try {
  await fastify.listen({ port, host });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
