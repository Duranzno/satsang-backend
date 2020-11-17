import faker from "faker"
import { EventCreateInput, UserCreateInput } from "@prisma/client"

import { hashPassword } from "../../utilities"

export const fakeEvent = (): EventCreateInput => ({
  title: faker.lorem.words(2),
  datetime: faker.date.soon(),
  description: faker.lorem.paragraph(),
  duration: 15,
})
export const fakeUser = async (): Promise<UserCreateInput & { password: string }> => {
  const password = faker.internet.password(10)
  return {
    password,
    name: faker.name.firstName(),
    email: faker.internet.email(),
    hashedPassword: await hashPassword(password)
  }
}