import faker from "faker";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const seed = async () => {
  const categoryNames = ["Mindfulness", "Spiritual", "Focused", "Movement", "Mantra", "Zen", "Kundalini"]

  const categories = await Promise.all(categoryNames.map((name) => db.category.create({ data: { name } })))
  await db.user.create({
    data: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      hashedPassword: faker.internet.password()
    },
  })
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (let i = 0; i < categories.length; i++) {
    const categoryId = categories[i].id;
    const date = faker.date.future()
    const address = faker.address
    const location = await db.location.create({
      data: {
        lat: Number(address.latitude()),
        lng: Number(address.longitude())
      }
    })
    await db.event.create(
      {
        data: {
          name: `${days[date.getDay()]}'s Meditation`,
          title: `Satsang Meditation`,
          description: `Session from the city of ${faker.address.city()}`,
          datetime: date,
          duration: Math.floor(Math.random() * (9 - 3) + 3),
          online: faker.random.boolean(),
          location: {
            connect: {
              id: location.id
            }
          },
          Category: {
            connect: {
              id: categoryId,
            },
          },
        },
      })
  }
}

export default seed;

