const config = {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
};
export const dbOptions = {
    connectionString: config.CONNECTION_STRING
};
export const tokenOptions = {
    key: config.JWT_PRIVATE_KEY
};
//# sourceMappingURL=config.js.map