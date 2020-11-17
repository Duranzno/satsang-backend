import { UserCreateInput } from "@prisma/client"
import request from "supertest"

import app from "../app"
import prisma from "../db"
import { afterAllDb, beforeAllDb, fakeUser } from "../__tests__/utils"
beforeAll(beforeAllDb)
afterAll(afterAllDb)
jest.setTimeout(10000)
describe("auth", () => {
  describe("POST /signup", () => {
    let user: UserCreateInput & { password: string }
    beforeAll(async () => {
      user = await fakeUser()
    })
    test("POST /signup", async () => {
      const { password, name, email } = user
      const response = await request(app)
        .post("/api/auth/signup")
        .set("Content-Type", "application/json")
        .send({ password, name, email })
        .set("Accept", "application/json")
        .expect(200)

      expect(response.body).toBeDefined()
      expect(response.body.id).toBeDefined()
      expect(response.body.token).toBeDefined()
      expect(response.body.token).not.toBe("")
    })
    test("422 no email", async () => {
      const { password, name } = user

      const response = await request(app)
        .post("/api/auth/signup")
        .set("Content-Type", "application/json")
        .send({ password, name })
        .set("Accept", "application/json")
        .expect(422)
      expect(response.error).toBeDefined()
    })
  })
  describe("POST /login", () => {
    let user: UserCreateInput & { password: string }
    beforeAll(async () => {
      user = await fakeUser()
      const { name, email, hashedPassword } = user;
      await prisma.user.create({ data: { name, email: email.toLowerCase(), hashedPassword } })
    })
    test("422 no password", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .set("Content-Type", "application/json")
        .send({ email: user.email })
        .set("Accept", "application/json")
        .expect(422)
      expect(response.error).toBeDefined()
    })
    test("wrong password", async (done) => {
      expect(await prisma.user.findOne({ where: { email: user.email.toLowerCase() } })).toBeDefined()
      const response = await request(app)
        .post("/api/auth/login")
        .set("Content-Type", "application/json")
        .send({ password: "Not the password", email: user.email })
        .set("Accept", "application/json")
        .expect(401)
      expect(response.error).toBeDefined()
      done()

    })
    test("correct login with token", async () => {
      const { email, password } = user;

      const response = await request(app)
        .post("/api/auth/login")
        .set("Content-Type", "application/json")
        .send({ password, email })
        .set("Accept", "application/json")
        .expect(200)
      expect(response.body.email).toBeDefined()
      expect(response.body.token).toBeDefined()
    })
  })
  describe.only("Testing Authentication", () => {
    let user: UserCreateInput & { password: string }
    beforeAll(async () => {
      user = await fakeUser()
      const { name, email, hashedPassword } = user;
      await prisma.user.create({ data: { name, email: email.toLowerCase(), hashedPassword } })
    })
    test("forbidden acces to unregistered", async () => {
      await request(app)
        .get("/api/auth/current")
        .expect(401)
    })
    test("enabling access to logged user", async () => {
      const { email, password } = user;
      const { body: { token } } = await request(app)
        .post("/api/auth/login")
        .set("Content-Type", "application/json")
        .send({ password, email })
        .set("Accept", "application/json")
        .expect(200)
      expect(token).toBeDefined()
      const res = await request(app)
        .get("/api/auth/current")
        .set("Authorization", `bearer ${token}`)
        .expect(200)
      expect(res.body).toBeDefined()
    })
  })
})