import faker from "faker"
import { EventCreateInput } from "@prisma/client"

export const fakeEvent = (): EventCreateInput => ({
  name: "",
  title: faker.lorem.words(2),
  datetime: faker.date.soon(),
  description: faker.lorem.paragraph(),
  duration: 15,
})
