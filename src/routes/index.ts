import { Router } from "express"

import AuthRoutes from "./authRoutes"
import CategoriesRoutes from "./categoriesRoutes"
import EventRoutes from "./eventsRoutes"
import UserRoutes from "./usersRoutes"

const router = Router()
router.use("/user", UserRoutes)
router.use("/auth", AuthRoutes)
router.use("/categorie", CategoriesRoutes)
router.use("/event", EventRoutes)

export default router
