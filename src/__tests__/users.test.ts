import { PrismaClient } from "@prisma/client"
// import { prisma } from "./utils";
const client = new PrismaClient()
// beforeAll(async () => {
//   await prisma.user.deleteMany({})
// })
// afterAll(async () => {
//   await prisma.user.deleteMany({})

//   await prisma.$disconnect();
// });

it.skip("cannot create a user with an email address that is already in user", async () => {
  // ARRANGE
  await client.user.create({
    data: {
      hashedPassword: "",
      email: "foo@bar.com",
    },
  })

  // ACT + ASSERT
})
