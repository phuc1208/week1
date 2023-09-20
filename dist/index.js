import 'dotenv/config';
import Fastify from 'fastify';
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