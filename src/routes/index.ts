import { Router } from "express"

// import AuthRoutes from './authRoutes';
// import CategoriesRoutes from './categoriesRoutes';
// import EventRoutes from './eventsRoutes';
import UserRoutes from "./usersRoutes"

const router: Router = Router()

router.use("/", UserRoutes)
// router.use('/auth', AuthRoutes);
// router.use('/categories', CategoriesRoutes);
// router.use('/events', EventRoutes);

export const MainRouter: Router = router
