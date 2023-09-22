import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import DomainError from "@lib/error";

const swaggerOptions = {
    swagger: {
        info: {
            title: "My Title",
            description: "My Description.",
            version: "1.0.0",
        },
        host: "localhost",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{ name: "Default", description: "Default" }],
    },
};

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

const resolvePlugin = (fastify: FastifyInstance) => {
    fastify.register(fastifySwagger, swaggerOptions);
    fastify.register(fastifySwaggerUi, swaggerUiOptions);
    fastify.setErrorHandler((error, _, reply) => {
        if (error instanceof DomainError) {
            reply.status(error.code)
                .send({
                    statusCode: error.code,
                    message: error.message,
                    error: "Domain throw error"
                })
        } else {
            reply.send(error);
        }
    })
}

export default resolvePlugin;