import { Router } from "express"
// import passport from 'passport'

import AuthRoutes from "./authRoutes"
import CategoriesRoutes from "./categoriesRoutes"
import EventRoutes from "./eventsRoutes"
import UserRoutes from "./usersRoutes"

const router = Router()
// const config: passport.AuthenticateOptions = { session: false, }

router.use("/auth", AuthRoutes)
router.use("/user", UserRoutes)
router.use("/categorie", CategoriesRoutes)
router.use("/event", EventRoutes)

export default router
