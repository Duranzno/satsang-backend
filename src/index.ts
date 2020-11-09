import dotenv from "dotenv"

import app from "./app"
import { PORT } from "./utilities/secrets"
import logger from "./utilities/logger"
import prisma from "./db"


dotenv.config()
app
  .listen(PORT, () => {
    logger.info(`server running on port : ${PORT}`)
    console.log(`server running on port : ${PORT}`)
  })
  .on("error", (e) => logger.error(e))
  .on("close", async () => {
    await prisma.$disconnect();
    logger.info(`server closed`)
    console.log(`server closed`)
  })
