import express from "express"
import { Application } from "express"
// import { PrismaClient } from "@prisma/client"

import middleware from "./middleware"
import errorHandlers from "./middleware/errorHandlers"
import { applyMiddleware } from "./utilities/shortcuts"
import router from "./routes"

const app: Application = express()

applyMiddleware(middleware, app)
app.use("/api", router)
applyMiddleware(errorHandlers, app)

export default app
