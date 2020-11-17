import { Router } from "express"
import passport from "passport"

import { LocalStrategy } from "../utilities/local-auth"
import { JWTStrategy } from "../utilities/jwt"

export const handleAuth = (router: Router) => {
  passport.use(LocalStrategy)
  passport.use(JWTStrategy)
  router.use(passport.initialize())
}
