import 'dotenv/config';
import Fastify from 'fastify';
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import userRepository from "./userRepository.js";
import userService from "./userService.js";
import userRouter from "./userRouter.js";
import DomainError from './error.js';
import { dbOptions, tokenOptions } from "./config.js";
import createConnection from "./connection.js";
import createTokenGenerator from "./token.js";
import createContainer from './registry/container.js';
const container = createContainer();
container.register("tokenGenerator").to(createTokenGenerator);
container.register("dbConnection").to(createConnection);
container.register("userRepository").to(userRepository);
container.register("userService").to(userService);
container.register("userRouter").to(userRouter);
container.bind("tokenOptions").to(tokenOptions);
container.bind("dbOptions").to(dbOptions);
const _userRouter = container.resolve("userRouter");
const fastify = Fastify({
    logger: true
});
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
fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUiOptions);
fastify.get("/", (_, reply) => {
    reply.send("Week 1");
});
fastify.register(_userRouter, { prefix: '/auth' });
fastify.setErrorHandler((error, _, reply) => {
    if (error instanceof DomainError) {
        reply.status(error.code)
            .send({
            statusCode: error.code,
            message: error.message,
            error: "Domain throw error"
        });
    }
    else {
        reply.send(error);
    }
});
const bootstrap = async () => {
    await fastify.listen({ port: 3000 });
};
bootstrap();
//# sourceMappingURL=index.js.map