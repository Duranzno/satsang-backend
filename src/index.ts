import dotenv from "dotenv"

import app from "./app"
import { PORT } from "./secrets"
import logger from "./utilities/logger"
import prisma from "./db"
dotenv.config()
logger.info("Starting Process")
app
  .listen(PORT, () => {
    logger.info(`server running on port : ${PORT}`)
    console.log(`server running on port : ${PORT}`)
  })
  .on("error", (e) => logger.error("error on app", e))
  .on("close", async () => {
    await prisma.$disconnect()
    logger.info(`server closed`)
    console.log(`server closed`)
  })
