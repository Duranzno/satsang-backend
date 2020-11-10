import { EventCreateInput } from "@prisma/client"
import { Request, Response, Router } from "express"

import prisma from "../db"
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
  const result = await prisma.event.findMany()
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
router.post("/", async (req: Request<unknown, unknown, EventCreateInput>, res: Response) => {
  const data = req.body
  const result = await prisma.event.create({ data: { ...data } })
  return res.json(result)
})

type IdParams = {
  id: string
}

/**
 * @swagger
 * /api/events/{id}:
 *    get:
 *      tags:
 *        - Event
 *      description: Gets existing Event
 */
router.get("/:id", async (_req: Request<IdParams>, res: Response) => {
  const { id } = _req.params
  const result = await prisma.event.findOne({ where: { id } })
  res.send(result)
})
/**
 * @swagger
 * /api/events/{id}:
 *    put:
 *      tags:
 *        - Event
 *      description: Complete Replacement of existing Post
 */
router.put("/:id", async (req: Request<IdParams, unknown, EventCreateInput>, res: Response) => {
  const { id } = req.params
  const result = await prisma.event.update({ where: { id }, data: { ...req.body } })
  res.json(result)
})

/**
 * @swagger
 * /api/events/{id}:
 *    delete:
 *      tags:
 *        - Event
 *      description: Deletes existing Post
 */
router.delete("/:id", async (req: Request<IdParams>, res: Response) => {
  const { id } = req.params
  const result = await prisma.event.delete({ where: { id } })
  res.json(result)
})
const EventRoutes: Router = router
export default EventRoutes
