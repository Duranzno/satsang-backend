import { Event, FollowersOfEvents, User } from "@prisma/client";
export type UserWithEvents = User & {
  Events: (
    FollowersOfEvents &
    { Event: Event, Follower: User }
  )[]
}
