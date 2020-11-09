import express from "express"
import { Application } from "express"
// import { PrismaClient } from "@prisma/client"
import swaggerUi from "swagger-ui-express"

import swaggerDocument from "./swagger.json"
import { MainRouter } from "./routes"
import errorHandlers from "./middleware/errorHandlers"
import middleware from "./middleware"
import { applyMiddleware } from "./utilities/shortcuts"

const app: Application = express()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api", MainRouter)
applyMiddleware(errorHandlers, app)
applyMiddleware(middleware, app)

export default app

// const prisma = new PrismaClient()

// app.post(`/user`, async (req, res) => {
//   const result = await prisma.user.create({
//     data: {
//       ...req.body,
//     },
//   })
//   res.json(result)
// })

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(result)
// })

// app.put("/publish/:id", async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.update({
//     where: { id: Number(id) },
//     data: { published: true },
//   })
//   res.json(post)
// })

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   })
//   res.json(post)
// })

// app.get(`/post/:id`, async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.findOne({
//     where: {
//       id: Number(id),
//     },
//   })
//   res.json(post)
// })

// app.get("/feed", async (_req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   })
//   res.json(posts)
// })

// app.get("/filterPosts", async (req, res) => {
//   const { searchString }: { readonly searchString?: string } = req.query
//   const draftPosts = await prisma.post.findMany({
//     where: {
//       OR: [
//         {
//           title: {
//             contains: searchString,
//           },
//         },
//         {
//           content: {
//             contains: searchString,
//           },
//         },
//       ],
//     },
//   })
//   res.json(draftPosts)
// })
