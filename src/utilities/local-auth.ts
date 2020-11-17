import SecurePassword from "secure-password"
import { Strategy } from 'passport-local'

import prisma from "../db"

import logger from "./logger"

const SP = new SecurePassword()

export const hashPassword = async (password: string) => {
  const hashedBuffer = await SP.hash(Buffer.from(password))
  return hashedBuffer.toString("base64")
}
export const verifyPassword = async (hashedPassword: string, password: string) => {
  try {
    return await SP.verify(Buffer.from(password), Buffer.from(hashedPassword, "base64"))
  } catch (error) {
    console.error(error)
    return false
  }
}
export enum AUTH_ERRORS {
  NO_USER = "Incorrect User",
  BAD_PASSWORD = "Incorrect Password"
}
export const localAuthenticateUser = async (email: string, password: string) => {
  const user = await prisma.user.findOne({
    where: { email: email.toLowerCase() }
  })

  if (!user) throw new Error(AUTH_ERRORS.NO_USER)

  switch (await verifyPassword(user.hashedPassword, password)) {
    case SecurePassword.VALID:
      break
    case SecurePassword.VALID_NEEDS_REHASH:
      // Upgrade hashed password with a more secure hash
      // eslint-disable-next-line no-case-declarations
      const improvedHash = await hashPassword(password)
      await prisma.user.update({
        where: { id: user.id },
        data: { hashedPassword: improvedHash }
      })
      break
    default:
      throw new Error(AUTH_ERRORS.BAD_PASSWORD)
  }

  const { hashedPassword, ...rest } = user
  logger.info("Created hashed password", hashedPassword)
  return rest
}

export const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
},
  async function (email, password, done) {
    try {
      const user = await localAuthenticateUser(email, password);
      return done(null, user);
    } catch (error) {
      if (Object.values(AUTH_ERRORS).includes(error?.message)) {
        return done(null, false, { message: error.message });
      }
      logger.info("Error on Passport Local Auth", error);
      return done(error);
    }
  }
);
