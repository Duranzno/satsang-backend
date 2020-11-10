import { EventCreateInput, Event } from '@prisma/client'
import request from 'supertest'
import app from '../app'
import { prisma } from '../__tests__/utils'
import faker from 'faker'
beforeAll(async () => {
  await prisma.user.deleteMany({})
  await prisma.event.deleteMany({})
})
afterAll(async () => {
  await prisma.user.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.$disconnect();
});

const fakeEvent = (): EventCreateInput => ({
  name: "",
  title: faker.lorem.words(2),
  datetime: faker.date.soon(),
  description: faker.lorem.paragraph(),
  duration: 15,
})

test('an event is added successfully', async () => {
  const newEvent = fakeEvent()
  const response = await request(app)
    .post('/api/events')
    .send(newEvent)
    .set("Content-Type", "application/json")
    .set('Accept', 'application/json')
    .expect(200)

  expect(response.body.id).toBeDefined()
  expect((response.body as Event).name).toBe(newEvent.name)
})

// test('a user with the same email is rejected', () => {
//   return request(app)
//     .post('/user')
//     .send(user)
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(409)
// })

// test('correct list of users returned', async () => {
//   const response = await request(app)
//     .get('/user')
//     .expect('Content-Type', /json/)
//     .expect(200)

//   expect(response.body).toBeDefined()
//   expect(response.body.length).toEqual(1)
// })
