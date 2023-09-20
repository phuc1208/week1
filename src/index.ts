import 'dotenv/config'
import Fastify, { FastifyPluginCallback } from 'fastify'
import userRepository, { IUserRepository } from "./userRepository.js";
import userService, { IUserService } from "./userService.js";
import userRouter, { UserRouter } from "./userRouter.js";
import DomainError from './error.js';
import { dbOptions, tokenOptions } from "./config.js";
import createConnection, { DbConnection, DbOptions } from "./connection.js";
import createTokenGenerator, { TokenGenerator, TokenOptions } from "./token.js";
import createContainer from './registry/container.js';

// khởi tạo dependencies
const container = createContainer();
container.register<TokenGenerator>("tokenGenerator").to(createTokenGenerator);
container.register<DbConnection>("dbConnection").to(createConnection);
container.register<IUserRepository>("userRepository").to(userRepository);
container.register<IUserService>("userService").to(userService);
container.register<FastifyPluginCallback<UserRouter>>("userRouter").to(userRouter);
container.bind<TokenOptions>("tokenOptions").to(tokenOptions);
container.bind<DbOptions>("dbOptions").to(dbOptions);


// resolve container
const _userRouter = container.resolve<FastifyPluginCallback>("userRouter");

//tạo fastify server
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
            })
    } else {
        reply.send(error);
    }
})
const bootstrap = async () => {
    await fastify.listen({ port: 3000 });
}

bootstrap();