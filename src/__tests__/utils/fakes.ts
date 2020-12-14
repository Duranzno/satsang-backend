import faker from "faker"
import { CategoryCreateInput, EventCreateInput, UserCreateInput } from "@prisma/client"

import { hashPassword } from "../../utilities"

export const fakeEvent = async (): Promise<EventCreateInput> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = await fakeUser()

  return ({
    title: faker.lorem.words(2),
    datetime: faker.date.soon(),
    description: faker.lorem.paragraph(),
    duration: 15,
    Instructor: { create: { ...user } }
  })
}
export const fakeUser = async (): Promise<UserCreateInput & { password: string }> => {
  const password = faker.internet.password(10)
  return {
    password,
    name: faker.name.firstName(),
    email: faker.internet.email(),
    hashedPassword: await hashPassword(password),
  }
}
export const fakeCategory = (): CategoryCreateInput => ({
  name: faker.commerce.productDescription(),
})