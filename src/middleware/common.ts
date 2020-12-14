import { RequestHandler, Router } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import compression from "compression"
import cacheControl from "express-cache-controller"
import timeout from "connect-timeout"

import { IS_PRODUCTION } from "../secrets"
import { logger } from "../utilities"


export const handleCors = (router: Router) => router.use(cors({ credentials: true, origin: true }))

export const handleBodyRequestParsing = (router: Router) => {
  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())
}
export const handleCompression = (router: Router) => {
  router.use(compression())
}
export const haltOnTime: RequestHandler = (req, _res, next) => {
  if (!req.timedout) {
    next()
  }
}
export const handleTimeout = (router: Router) => {
  if (!(IS_PRODUCTION || process.env.NODE_ENV === "test")) {
    const time = "5s"
    logger.info(`Will use a timeout of ${time}`)
    router.use(timeout(time))
    router.use(haltOnTime)
  }
}
export const handleCaching = (router: Router) => {
  router.use(
    cacheControl({
      maxAge: 300,
      public: true,
    })
  )
}
