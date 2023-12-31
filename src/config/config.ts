import { DbOptions } from "@modules/auth/connection.js"
import { TokenOptions } from "@lib/token.js"

const config = {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
}

export const dbOptions: DbOptions = {
    connectionString: config.CONNECTION_STRING
}

export const tokenOptions: TokenOptions = {
    key: config.JWT_PRIVATE_KEY
}