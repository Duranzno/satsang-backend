import { NextFunction, Request, RequestHandler, Response, Router } from "express"
import passport from "passport"

import prisma from "../db"
import { generateJWT, hashPassword } from "../utilities"
import logger from "../utilities/logger"

import { UserLoginBody, UserSignupBody } from "./interfaces"

const router: Router = Router()
router.post("/login")


router.post("/signup", async (req: Request<unknown, unknown, UserSignupBody>, res: Response) => {
  const { email, name, password } = req.body

  if (!email) return res.status(422).json({ errors: { email: "is required" } })
  if (!name) return res.status(422).json({ errors: { name: "is required" } })
  if (!password) return res.status(422).json({ errors: { password: "is required" } })

  const hashedPassword = await hashPassword(password)

  const result = await prisma.user.create({
    data: {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      hashedPassword,
      role: "user",
    },
    select: { id: true, name: true, email: true, role: true },
  })
  logger.info(`Created new User with id ${result.id}`)
  return res.json({ ...result, token: generateJWT(email, result.id + "") })
})

function auth(
  req: Request<unknown, unknown, UserLoginBody>,
  res: Response,
  next: NextFunction
): RequestHandler {
  return passport.authenticate("local", { session: false }, (err, passportUser, info) => {
    if (err) return next(err)
    try {
      if (!passportUser && info?.message) {
        throw Error(info.message)
      } else {
        const user = passportUser
        user.token = generateJWT(user.email, user.id)
        return res.json(user)
      }
    } catch (error) {
      return res.status(401).send({ message: error?.message ?? "Error on Authorization" })
    }
  })(req, res, next)
}
router.post(
  "/login",
  async (req: Request<unknown, unknown, UserLoginBody>, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email) return res.status(422).json({ errors: { email: "is required" } })
    if (!password) return res.status(422).json({ errors: { password: "is required" } })

    return auth(req, res, next)
  }
)

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    res.json(req.user)
  }
)

const AuthRoutes: Router = router
export default AuthRoutes
