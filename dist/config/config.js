"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenOptions = exports.dbOptions = void 0;
const config = {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
};
exports.dbOptions = {
    connectionString: config.CONNECTION_STRING
};
exports.tokenOptions = {
    key: config.JWT_PRIVATE_KEY
};
//# sourceMappingURL=config.js.map