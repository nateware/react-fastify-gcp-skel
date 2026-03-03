import type { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async () => {
    return { message: "This is an example API route" };
  });
};

export default example;
