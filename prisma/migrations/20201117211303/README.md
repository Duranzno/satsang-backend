# Migration `20201117211303`

This migration has been generated by Alejandro D at 11/17/2020, 5:13:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_userId_fkey"

ALTER TABLE "public"."Event" DROP COLUMN "userId"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201117204931..20201117211303
--- datamodel.dml
+++ datamodel.dml
@@ -3,23 +3,22 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
-  id                Int                 @id @default(autoincrement())
-  createdAt         DateTime            @default(now())
-  updatedAt         DateTime            @updatedAt
-  email             String              @unique
-  hashedPassword    String
-  role              String?             @default("user")
-  name              String?             @unique
-  photoUrl          String?
-  InstructedEvents  Event[]             @relation("instructorTable")
-  FollowersOfEvents FollowersOfEvents[]
-  Event             Event[]
+  id               Int                 @id @default(autoincrement())
+  createdAt        DateTime            @default(now())
+  updatedAt        DateTime            @updatedAt
+  email            String              @unique
+  hashedPassword   String
+  role             String?             @default("user")
+  name             String?             @unique
+  photoUrl         String?
+  InstructedEvents Event[]             @relation("instructorTable")
+  Events           FollowersOfEvents[]
 }
 model Category {
   id    Int     @id @default(autoincrement())
@@ -39,10 +38,8 @@
   description       String?
   Instructor        User                @relation("instructorTable", fields: [instructorId], references: [id])
   instructorId      Int
   online            Boolean?            @default(true)
-  User              User?               @relation(fields: [userId], references: [id])
-  userId            Int?
   Categories        Category[]
   FollowersOfEvents FollowersOfEvents[]
   Location          Location?
 }
```

