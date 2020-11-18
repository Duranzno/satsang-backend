import { Request, Response, Router } from "express"

import prisma from "../db"
import { logger } from "../utilities"

import { AttendanceParams, IdParams, UserSignupBody } from "./interfaces"

const router: Router = Router()

router.get("/:id", async (req: Request<IdParams, unknown, unknown>, res: Response) => {
  const result = await prisma.user.findOne({
    where: { id: req.params!.id },
    include: { Events: { include: { Event: true } } }
  })
  res.json(result)
})

router.put("/:id", async (req: Request<IdParams, unknown, UserSignupBody>, res: Response) => {
  const body: UserSignupBody = req.body;
  const result = await prisma.user.update({
    where: { id: req.params!.id },
    data: { ...body }
  })
  res.send(result)
})

router.delete("/:id", async (req: Request<IdParams, unknown, unknown>, res: Response) => {
  // Prisma does not support this yet (cascaidng deletion) so in a future this should be added to a queue and the run as script like  https://www.prisma.io/docs/guides/database-workflows/cascading-deletes/postgresql#9-validate-the-deletion-behavior-in-a-nodejs-script
  // await prisma.followersOfEvents.delete({
  // })
  // const result = await prisma.user.delete({ where: { id: req.params!.id } })
  // res.send(result)
  logger.warn("Someone tried to delete their account")
  res.json(200)
})

router.post("/:id/attendance/:eventId", async (req: Request<AttendanceParams, unknown, unknown>, res: Response) => {
  const result = await prisma.user.update({
    where: { id: req.params!.id },
    data: { Events: { connect: { followerId_eventId: { eventId: req.params!.eventId, followerId: req.params!.id } } } },
    include: { Events: { include: { Event: true, Follower: true } } },
  })
  res.json(result)
})

router.delete("/:id/attendance/:eventId", async (req: Request<AttendanceParams, unknown, unknown>, res: Response) => {
  const result = await prisma.user.update({
    where: { id: req.params!.id },
    data: { Events: { disconnect: { followerId_eventId: { eventId: req.params!.eventId, followerId: req.params!.id } } } },
    include: { Events: true },
  })
  res.json(result)
})


const UserRoutes: Router = router
export default UserRoutes