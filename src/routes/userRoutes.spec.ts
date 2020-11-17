import { Event, User, UserGetPayload } from "@prisma/client"
import request from "supertest"

import app from "../app"
import { afterAllDb, beforeAllDb, fakeEvent, fakeUser, prisma } from "../__tests__/utils"

type UserWithEvents = UserGetPayload<{ include: { Events: true } }>

beforeAll(beforeAllDb)

afterAll(afterAllDb)

describe("/user", () => {
  let user: UserWithEvents
  let id: number
  beforeEach(async () => {
    const { password, ...data } = await fakeUser()

    user = await prisma.user.create({ data, include: { Events: true } })
    id = user.id
    return { password }
  })
  test("should GET /:id | get current user data with details", async () => {
    const response = await request(app).get(`/api/user/${id}`).expect(200)
    expect(response.body).toBeDefined()
    const resUser = response.body as UserWithEvents
    expect(resUser?.Events).toBeDefined()
    expect(resUser?.Events?.length).toBe(0)
    expect(resUser?.name).toBe(user.name)
  })

  test("should PUT /:id | update user data", async () => {
    const newUserData = await fakeUser()
    const response = await request(app)
      .put(`/api/user/${id}`)
      .set("Content-Type", "application/json")
      .send({ name: newUserData.name })
      .set("Accept", "application/json")
      .expect(200)
    expect(response.body).toBeDefined()
    expect(response.body.email).toBe(user.email)
    expect(response.body.name).toBe(newUserData.name)
  })
  test("should  DELETE /:id | delete user ", async () => {
    await request(app).delete(`/api/user/${id}`).expect(200)
    const user = await prisma.user.findOne({ where: { id } })
    expect(user).toBeNull()
  })
})
describe("/attendance", () => {
  let attendingEvent: Event
  let unattendingEvent: Event
  let user: User
  let id: number
  beforeEach(async () => {
    const { password, ...data } = await fakeUser()

    user = await prisma.user.create({ data, include: { Events: true } })
    id = user.id
    unattendingEvent = await prisma.event.create({ data: { ...fakeEvent() } })
    attendingEvent = await prisma.event.create({ data: { ...fakeEvent() } })
    await prisma.user.update({
      where: { id: Number(user.id) },
      data: { Events: { connect: { id: attendingEvent.id } } },
      include: { Events: true },
    })
    return { password }
  })
  test("should GET user attendance with /user", async () => {
    const response = await request(app).get(`/api/user/${id}/`).expect(200)
    expect(response.body?.Events).toBeDefined()
    expect(response.body?.Events.length).toBeGreaterThan(0)
  })
  test("should DELETE(cancel) /:id/attendance", async () => {
    const response = await request(app)
      .delete(`/api/user/${id}/attendance/${attendingEvent.id}`)
      .set("Accept", "application/json")
      .expect(200)
    expect(response.body?.Events).toBeDefined()
    expect(response.body?.Events.length).toBe(0)
    const expUser = await prisma.user.findOne({
      where: { id },
      include: { Events: true },
    })

    expect(expUser?.Events.length).toBe(0)
    // const events=await prisma.event.findOne({where:{id:event.id},include:{Users}})
    expect(response.body).toBeDefined()
  })
  test("should POST /:id/attendance | change attendance status", async () => {
    const response = await request(app)
      .post(`/api/user/${id}/attendance/${unattendingEvent.id}`)
      .set("Accept", "application/json")
      .expect(200)

    const expUser = await prisma.user.findOne({
      where: { id },
      include: { Events: true },
    })

    expect(expUser?.Events.length).toBe(2)
    expect(expUser?.Events[1].title).toBe(unattendingEvent.title)
    // const events=await prisma.event.findOne({where:{id:event.id},include:{Users}})
    expect(response.body).toBeDefined()
  })
})
