import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({ errorFormat: "pretty" })
export * from "./fakes"
export { default as faker } from "faker"
async function deleteAll() {
  await prisma.followersOfEvents.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.user.deleteMany({})

}
export async function beforeAllDb() {
  await deleteAll()
}
export async function afterAllDb() {
  await deleteAll()
  await prisma.$disconnect()
}
