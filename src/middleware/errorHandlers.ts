import { NextFunction, Request, Response, Router } from "express"

import * as ErrorHandler from "../utilities/errorHandler"
import { HTTP403Error } from "../utilities/httpErrors"

const handle404Error = (router: Router) => {
  router.use((_req: Request, _res: Response) => {
    ErrorHandler.notFoundError()
  })
}

type ErrorWithCode = Error & { code?: string }

const handleClientError = (router: Router) => {
  router.use((err: ErrorWithCode, _req: Request, res: Response, next: NextFunction) => {
    if (err.code == "EBADCSRFTOKEN") {
      err = new HTTP403Error()
    }
    ErrorHandler.clientError(err, res, next)
  })
}

const handleServerError = (router: Router) => {
  router.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next)
  })
}


export default [handle404Error, handleClientError, handleServerError]
