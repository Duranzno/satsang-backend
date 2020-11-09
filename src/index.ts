import dotenv from "dotenv"

import app from "./app"
import { PORT } from "./utilities/secrets"
import logger from "./utilities/logger"

dotenv.config()
app
  .listen(PORT, () => {
    logger.info(`server running on port : ${PORT}`)
    console.log(`server running on port : ${PORT}`)
  })
  .on("error", (e) => logger.error(e))
