import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({ errorFormat: "pretty" })
export * from "./fakes"
export { default as faker } from "faker"

export async function beforeAllDb() {
  await prisma.user.deleteMany({})
  await prisma.event.deleteMany({})
}
export async function afterAllDb() {
  await prisma.user.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.$disconnect()
}
