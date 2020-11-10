import { Request, Response, Router } from "express"
import prisma from "../db"
import { EventCreateInput, Event } from "@prisma/client"
const router: Router = Router()

/**
 * @swagger
 * /api/events:
 *    get:
 *      tags:
 *        - Event
 *      description: Get all events 
 */
router.get("/", async (_req: Request, res: Response) => {
  const result = await prisma.event.findMany({})
  res.json(result)
})

/**
 * @swagger
 * /api/events:
 *    post:
 *      tags:
 *        - Event
 *      description: Creates a new Event
 */
router.post("/", async (req: Request<{}, Event, EventCreateInput>, res: Response) => {
  const data = req.body;
  const result = await prisma.event.create({ data: { ...data } })
  return res.json(result)
})

/**
 * @swagger
 * /api/events/{id}:
 *    get:
 *      tags:
 *        - Event
 *      description: Gets existing Event
 */
router.get("/:id", async (_req: Request, res: Response) => {
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
router.put("/:id", async (_req: Request, res: Response) => {
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
router.delete("/:id", async (_req: Request, res: Response) => {
  res.send([])
})
const EventRoutes: Router = router
export default EventRoutes
