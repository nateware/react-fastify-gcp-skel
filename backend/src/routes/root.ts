import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async () => {
    return { status: "ok" };
  });
};

export default root;
