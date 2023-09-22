import "module-alias/register";
import 'dotenv/config';
import Fastify, { FastifyPluginCallback } from 'fastify'
import {
    DbConnection,
    DbOptions,
    IUserRepository,
    IUserService,
    UserRouter,
    createConnection,
    userRepository,
    userRouter,
    userService
} from "@modules/auth";
import { dbOptions, tokenOptions } from "@config/config";
import createTokenGenerator, { TokenGenerator, TokenOptions } from "@lib/token";
import { createContainer } from '@registry/index';
import resolvePlugin from "./bootstrap";

// khởi tạo dependencies
const container = createContainer();
container.register<TokenGenerator>("tokenGenerator").to(createTokenGenerator);
container.register<DbConnection>("dbConnection").to(createConnection);
container.register<IUserRepository>("userRepository").to(userRepository);
container.register<IUserService>("userService").to(userService);
container.register<FastifyPluginCallback<UserRouter>>("userRouter").to(userRouter, { prefix: "/auth" });
container.bind<TokenOptions>("tokenOptions").to(tokenOptions);
container.bind<DbOptions>("dbOptions").to(dbOptions);

//tạo fastify server
const fastify = Fastify({
    logger: process.env.NODE_ENV === "development" ? true : false
});

const bootstrap = async () => {
    resolvePlugin(fastify);
    container.loadRoutes(fastify);

    await fastify.listen({ port: 80 });
    return { fastify, container };
}

bootstrap();
export default bootstrap;