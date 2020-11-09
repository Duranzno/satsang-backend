import { NextFunction, Request, Response, Router } from "express"

export type Wrapper = (router: Router) => void

export type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router)
  }
}
