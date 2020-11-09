import { Router } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import session from "express-session"
import cacheControl from 'express-cache-controller'

import { SESSION_SECRET } from "../utilities/secrets"

export const handleCors = (router: Router) => router.use(cors({ credentials: true, origin: true }))

export const handleBodyRequestParsing = (router: Router) => {
  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())
}
export const handleSession = (router: Router) => {
  router.use(
    session({
      secret: SESSION_SECRET,
      cookie: {
        maxAge: 60000,
      },
      resave: false,
      saveUninitialized: false,
    })
  )
}
export const handleCompression = (router: Router) => {
  router.use(compression())
}

export const handleCookie = (router: Router) => {
  router.use(cookieParser())
}
export const handleCaching = (router: Router) => {

  router.use(cacheControl({
    maxAge: 300,
    public: true,
  }))
}