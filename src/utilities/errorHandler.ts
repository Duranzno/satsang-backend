import { NextFunction, Response } from "express"

import { HTTP404Error, HTTPClientError } from "../utilities/httpErrors"

import logger from "./logger"


export const notFoundError = () => {
  throw new HTTP404Error("Method not found.")
}

export const clientError = (err: Error | HTTPClientError, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    const { message, statusCode } = err
    logger.warn({
      message,
    })
    res.status(statusCode).send(message)
  } else {
    next(err)
  }
}

export const serverError = (err: Error, res: Response, _next: NextFunction) => {
  logger.error({ ...err })
  if (process.env.NODE_ENV === "production") {
    res.status(500).send("Internal Server Error")
  } else {
    res.status(500).send(err.stack)
  }
}
