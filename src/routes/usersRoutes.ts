import { Request, Response, Router } from "express"

const router: Router = Router()

router.get("/", (_req, _res) => {
  // Your implementation logic comes here ...
})

router.post("/", (_req, _res) => {
  // Your implementation logic comes here ...
})
router.get("/:id", (_req: Request, res: Response) => {
  res.send({})
})
router.patch("/:id", (_req: Request, res: Response) => {
  res.send([])
})
router.delete("/:id", (_req: Request, res: Response) => {
  res.send([])
})
const UserRoutes: Router = router
export default UserRoutes
