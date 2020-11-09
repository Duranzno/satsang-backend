import { Router } from "express"
import winston from "winston"
import expressWinston from "express-winston"
import dotenv from "dotenv"

dotenv.config()

const handleLogging = (router: Router) =>
  router.use(
    expressWinston.logger({
      msg: "HTTP {{req.method}} {{req.url}}",
      format: winston.format.combine(winston.format.colorize(), winston.format.json()),
      transports: [new winston.transports.Console({ handleExceptions: true })],
    })
  )
expressWinston
export { handleLogging }
