import { Router } from "express"

import AuthRoutes from "./authRoutes"
import CategoriesRoutes from "./categoriesRoutes"
import EventRoutes from "./eventsRoutes"
import UserRoutes from "./usersRoutes"

const router = Router()
router.use("/users", UserRoutes)
router.use("/auth", AuthRoutes)
router.use("/categories", CategoriesRoutes)
router.use("/events", EventRoutes)

export default router
