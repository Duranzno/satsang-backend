import { Event } from "@prisma/client"
import request from "supertest"

import app from "../app"
import { fakeEvent, faker, prisma } from "../__tests__/utils"
beforeAll(async () => {
  await prisma.user.deleteMany({})
  await prisma.event.deleteMany({})
})
afterAll(async () => {
  await prisma.user.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.$disconnect()
})

test("POST event", async () => {
  const newEvent = fakeEvent()
  const response = await request(app)
    .post("/api/events")
    .set("Content-Type", "application/json")
    .send(newEvent)
    .set("Accept", "application/json")
    .expect(200)

  expect(response.body.id).toBeDefined()
  expect((response.body as Event).name).toBe(newEvent.name)
  const created = await prisma.event.findFirst({ where: { title: newEvent.title } })
  expect(created?.description).toBe(newEvent.description)
})
test("GET all events", async () => {
  const res = await request(app).get("/api/events").expect(200)
  expect(res.body).toBeDefined()
  expect(res.body?.length).toBeGreaterThanOrEqual(1)
  const first: Event = res.body.pop()
  expect(first.title).toBeDefined()
})

test("GET specific event", async () => {
  const e = await prisma.event.create({ data: { ...fakeEvent() } })
  const res = await request(app).get(`/api/events/${e.id}`).expect(200)
  expect((res.body as Event).title).toBe(e.title)
})

test("PUT specific event", async () => {
  const e = await prisma.event.create({ data: { ...fakeEvent() } })
  const updatedData: Partial<Event> = {
    description: faker.lorem.paragraph(),
    online: false,
    duration: faker.random.number(60),
  }

  const res = await request(app)
    .put(`/api/events/${e.id}`)
    .set("Content-Type", "application/json")
    .send(updatedData)
    .expect(200)

  const body = res.body as Event
  expect(body).toHaveProperty("title")
  expect(body.title).toBe(e.title)
  expect(body.description).not.toBe(e.description)
  expect(body.description).toBe(updatedData.description)
  expect(body.duration).toBe(updatedData.duration)
})

test("GET specific event", async () => {
  const e = await prisma.event.create({ data: { ...fakeEvent() } })
  const originalList = await prisma.event.findMany({})
  const res = await request(app).delete(`/api/events/${e.id}`).expect(200)

  expect((res.body as Event).title).toBe(e.title)

  const modList = await prisma.event.findMany({})
  expect(modList.length).toBeLessThan(originalList.length)

  const nullEvent = await prisma.event.findOne({ where: { id: e.id } })
  expect(nullEvent).toBeNull()
})
