import { Request, Response, Router } from "express"

const router: Router = Router()

/**
 * @swagger
 * /api/events:
 *    get:
 *      tags:
 *        - Event
 *      description: Get all events 
 */
router.get("/", (_req: Request, res: Response) => {
  res.send([])
})

/**
 * @swagger
 * /api/events:
 *    post:
 *      tags:
 *        - Event
 *      description: Creates a new Event
 */
router.post("/", (_req: Request, res: Response) => {
  res.send([])
})

/**
 * @swagger
 * /api/events/{id}:
 *    get:
 *      tags:
 *        - Event
 *      description: Gets existing Event
 */
router.get("/:id", (_req: Request, res: Response) => {
  res.send([])
})
/**
 * @swagger
 * /api/events/{id}:
 *    put:
 *      tags:
 *        - Event
 *      description: Complete Replacement of existing Post
 */
router.put("/:id", (_req: Request, res: Response) => {
  res.send([])
})

/**
 * @swagger
 * /api/events/{id}:
 *    delete:
 *      tags:
 *        - Event
 *      description: Deletes existing Post
 */
router.delete("/:id", (_req: Request, res: Response) => {
  res.send([])
})
const EventRoutes: Router = router
export default EventRoutes
