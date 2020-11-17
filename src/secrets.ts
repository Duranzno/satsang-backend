import * as path from "path"

import dotenv from "dotenv"

dotenv.config({})

export const ENVIRONMENT = process.env.APP_ENV ?? "dev"
export const IS_PRODUCTION = process.env.APP_ENV === "production"
export const PORT = process.env.PORT ?? 3001
export const LOG_DIRECTORY = process.env.LOG_DIRECTORY ?? path.resolve("logs")
export const JWT_SECRET = process.env.JWT_SECRET ?? "secret"

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? ""
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? ""

export const DOMAIN = process.env.DOMAIN ?? "localhost"
export const BASE_URL = `http://${DOMAIN}:${PORT}`
