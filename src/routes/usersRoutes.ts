import { Request, Response, Router } from "express"

import prisma from "../db"

import { AttendanceParams, IdParams, UserSignupBody } from "./interfaces"

const router: Router = Router()

router.get("/:id", async (req: Request<IdParams, unknown, unknown>, res: Response) => {
  const result = await prisma.user.findOne({
    where: { id: Number(req.params!.id) },
    include: { Events: true },
  })
  res.json(result)
})

router.put("/:id", async (req: Request<IdParams, unknown, UserSignupBody>, res: Response) => {
  const body: UserSignupBody = req.body
  const result = await prisma.user.update({
    where: { id: Number(req.params!.id) },
    data: { ...body },
  })
  res.send(result)
})

router.delete("/:id", async (req: Request<IdParams, unknown, unknown>, res: Response) => {
  const result = await prisma.user.delete({ where: { id: Number(req.params!.id) } })
  res.send(result)
})

router.post(
  "/:id/attendance/:eventId",
  async (req: Request<AttendanceParams, unknown, unknown>, res: Response) => {
    const result = await prisma.user.update({
      where: { id: Number(req.params!.id) },
      data: { Events: { connect: { id: req.params!.eventId } } },
      include: { Events: true },
    })
    res.json(result)
  }
)

router.delete(
  "/:id/attendance/:eventId",
  async (req: Request<AttendanceParams, unknown, unknown>, res: Response) => {
    const result = await prisma.user.update({
      where: { id: Number(req.params!.id) },
      data: { Events: { disconnect: { id: req.params!.eventId } } },
      include: { Events: true },
    })
    res.json(result)
  }
)

const UserRoutes: Router = router
export default UserRoutes
