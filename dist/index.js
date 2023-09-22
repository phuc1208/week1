"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const auth_1 = require("@modules/auth");
const config_1 = require("@config/config");
const token_1 = __importDefault(require("@lib/token"));
const index_1 = require("@registry/index");
const bootstrap_1 = __importDefault(require("./bootstrap"));
const container = (0, index_1.createContainer)();
container.register("tokenGenerator").to(token_1.default);
container.register("dbConnection").to(auth_1.createConnection);
container.register("userRepository").to(auth_1.userRepository);
container.register("userService").to(auth_1.userService);
container.register("userRouter").to(auth_1.userRouter, { prefix: "/auth" });
container.bind("tokenOptions").to(config_1.tokenOptions);
container.bind("dbOptions").to(config_1.dbOptions);
const fastify = (0, fastify_1.default)({
    logger: process.env.NODE_ENV === "development" ? true : false
});
const bootstrap = async () => {
    (0, bootstrap_1.default)(fastify);
    container.loadRoutes(fastify);
    await fastify.listen({ port: 80 });
    return { fastify, container };
};
bootstrap();
exports.default = bootstrap;
//# sourceMappingURL=index.js.map