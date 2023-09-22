"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const error_1 = __importDefault(require("@lib/error"));
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
const resolvePlugin = (fastify) => {
    fastify.register(swagger_1.default, swaggerOptions);
    fastify.register(swagger_ui_1.default, swaggerUiOptions);
    fastify.setErrorHandler((error, _, reply) => {
        if (error instanceof error_1.default) {
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
};
exports.default = resolvePlugin;
//# sourceMappingURL=bootstrap.js.map