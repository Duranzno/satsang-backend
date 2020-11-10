import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({ errorFormat: "pretty" })
export * from "./fakes"
export { default as faker } from "faker"
