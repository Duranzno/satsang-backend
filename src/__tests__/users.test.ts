import { PrismaClient } from "@prisma/client";
import { prisma } from "./utils";
const client = new PrismaClient();
beforeAll(async () => {
  await prisma.user.deleteMany({})
})
afterAll(async () => {
  await prisma.user.deleteMany({})

  await prisma.$disconnect();
});

it("cannot create a user with an email address that is already in user", async () => {
  // ARRANGE
  await client.user.create({
    data: {

      email: "foo@bar.com",
    },
  });

  // ACT + ASSERT
  expect(
    client.user.create({
      data: {
        email: "foo@bar.com",
      },
    })
  ).rejects.toThrow();
});
