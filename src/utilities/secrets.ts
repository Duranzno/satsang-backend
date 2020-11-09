import * as path from "path"

import * as dotenv from "dotenv"

dotenv.config({ path: ".env" })

export const ENVIRONMENT = process.env.APP_ENV ?? "dev"
export const IS_PRODUCTION = process.env.APP_ENV === "production"
export const APP_PORT = process.env.APP_PORT ?? 3000
export const LOG_DIRECTORY = process.env.LOG_DIRECTORY ?? path.resolve("logs")
export const JWT_SECRET = process.env.JWT_SECRET ?? "secret"
export const SESSION_SECRET = process.env.SESSION_SECRET ?? "secret"
