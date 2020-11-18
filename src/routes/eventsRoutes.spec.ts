import { Event } from "@prisma/client"
import request from "supertest"

import app from "../app"
import { afterAllDb, beforeAllDb, fakeEvent, faker, prisma } from "../__tests__/utils"

beforeAll(beforeAllDb)
afterAll(afterAllDb)

test("POST event", async () => {
  const newEvent = await fakeEvent()
  const response = await request(app)
    .post("/api/event")
    .set("Content-Type", "application/json")
    .send(newEvent)
    .set("Accept", "application/json")
    .expect(200)

  expect(response.body.id).toBeDefined()
  expect((response.body as Event).description).toBe(newEvent.description)
  const created = await prisma.event.findFirst({ where: { title: newEvent.title } })
  expect(created?.description).toBe(newEvent.description)
})
describe('GET /', () => {
  // let event: Event;
  // beforeAll(async () => {
  //   const data = await fakeEvent()
  // event = await prisma.event.create({
  // data: { ...data, Category: { create: [] } },
  // 
  // })
  //   expect
  // });
  afterAll(async () => {
    await prisma.user.deleteMany({})
    await prisma.event.deleteMany({})
  })
  test("GET all events", async () => {
    const res = await request(app).get("/api/event").expect(200)
    expect(res.body).toBeDefined()
    expect(res.body?.length).toBeGreaterThanOrEqual(1)
    const first: Event = res.body.pop()
    expect(first.title).toBeDefined()
  })
  test.skip('should get all events inside one category ', async () => {
    const categoriesData = ["", "", ""]
    const categories = `${categoriesData[0]},${categoriesData[1]}`
    await request(app).get(`/api/event`).query({ categories }).expect(200)

  });
  test.skip('should get all events based on location ', async () => {
    const lng = 1
    const lat = 1
    await request(app).get(`/ api / event ? `).query({ lat, lng }).expect(200)
  });
});
test("GET specific event", async () => {
  const e = await prisma.event.create({ data: { ...await fakeEvent() } })
  const res = await request(app).get(`/ api / event / ${e.id} `).expect(200)
  expect((res.body as Event).title).toBe(e.title)
})

test("PUT specific event", async () => {
  const e = await prisma.event.create({ data: { ...await fakeEvent() } })
  const updatedData: Partial<Event> = {
    description: faker.lorem.paragraph(),
    online: false,
    duration: faker.random.number(60),
  }

  const res = await request(app)
    .put(`/ api / event / ${e.id} `)
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
  const e = await prisma.event.create({ data: { ...await fakeEvent() } })
  const originalList = await prisma.event.findMany({})
  const res = await request(app).delete(`/ api / event / ${e.id} `).expect(200)

  expect((res.body as Event).title).toBe(e.title)

  const modList = await prisma.event.findMany({})
  expect(modList.length).toBeLessThan(originalList.length)

  const nullEvent = await prisma.event.findOne({ where: { id: e.id } })
  expect(nullEvent).toBeNull()
})
