import { EventCreateInput } from "@prisma/client"
import { Request, Response, Router } from "express"

import prisma from "../db"

import { IdParams } from './interfaces'
const router: Router = Router()


type GetEventsReqQuery = {
  categories?: string[]
  lat?: string
  lng?: string
}

router.get("/",
  async (_req: Request<unknown, unknown, unknown, GetEventsReqQuery>,
    res: Response) => {
    // const { categories, lat, lng } = _req.query
    const result = await prisma.event.findMany()
    res.json(result)
  })
router.post("/", async (req: Request<unknown, unknown, EventCreateInput>, res: Response) => {
  const data = req.body
  const result = await prisma.event.create({ data: { ...data } })
  return res.json(result)
})

router.get("/:id", async (_req: Request<IdParams>, res: Response) => {
  const { id } = _req.params
  const result = await prisma.event.findOne({ where: { id: id } })
  res.send(result)
})
router.put("/:id", async (req: Request<IdParams, unknown, EventCreateInput>, res: Response) => {
  const { id } = req.params
  const result = await prisma.event.update({ where: { id: id }, data: { ...req.body } })
  res.json(result)
})
router.delete("/:id", async (req: Request<IdParams>, res: Response) => {
  const { id } = req.params
  try {
    const result = await prisma.event.delete({ where: { id: id } })
    res.json(result)
  } catch (error) {
    if (error?.code === "P2016") {
      res.statusCode = 400
      res.statusMessage = "Invalid ID Supplied"
      res.send(false)
    }
  }
})
const EventRoutes: Router = router
export default EventRoutes
