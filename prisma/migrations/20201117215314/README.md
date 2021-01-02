# Migration `20201117215314`

This migration has been generated by Alejandro D at 11/17/2020, 5:53:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."FollowersOfEvents.eventId_unique"

DROP INDEX "public"."FollowersOfEvents.followerId_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201117215016..20201117215314
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
   id               String              @id @default(cuid())
@@ -45,11 +45,11 @@
 }
 model FollowersOfEvents {
   Follower   User     @relation(fields: [followerId], references: [id])
-  followerId String   @unique
+  followerId String
   Event      Event    @relation(fields: [eventId], references: [id])
-  eventId    String   @unique
+  eventId    String
   createdAt  DateTime @default(now())
   @@id([followerId, eventId])
 }
```

