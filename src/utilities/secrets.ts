import * as path from "path"

export const ENVIRONMENT = process.env.APP_ENV ?? "dev"
export const IS_PRODUCTION = process.env.APP_ENV === "production"
export const PORT = process.env.PORT ?? 3000
export const LOG_DIRECTORY = process.env.LOG_DIRECTORY ?? path.resolve("logs")
export const JWT_SECRET = process.env.JWT_SECRET ?? "secret"
export const SESSION_SECRET = process.env.SESSION_SECRET ?? "secret"
