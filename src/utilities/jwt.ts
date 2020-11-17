import { ExtractJwt, Strategy } from 'passport-jwt'
import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from "../secrets";
import prisma from '../db';

import logger from "./logger";

const algorithm = 'HS256'
export const generateJWT = (email: string, id: string): string | Error => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  try {
    return jsonwebtoken.sign({
      email,
      id,
      exp: parseInt(`${expirationDate.getTime() / 1000}`, 10),
    }, JWT_SECRET, { algorithm });
  } catch (error) {
    logger.error("Error on JWT Generation", error)
    return error
  }
}
enum JWT_ERRORS { NO_USER = "No such user for that token", BAD_TOKEN = "Bad Token" }
export const JWTStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  passReqToCallback: false,
  algorithms: [algorithm],
  // issuer: 'enter issuer here',
  // audience: 'enter audience here',
  // ignoreExpiration: false,
  // passReqToCallback: false,
  // jsonWebTokenOptions: {
  //   complete: false,
  //   maxAge: '2d',
  //   clockTimestamp: 100,
  //   nonce: 'string here for OpenID'
  // }
},
  async function (jwt_payload, done) {
    try {
      if (!jwt_payload) { throw Error(JWT_ERRORS.BAD_TOKEN) }
      const { email } = jwt_payload;
      const user = await prisma.user.findOne({
        where: { email },
        select: { hashedPassword: false, email: true, name: true, id: true, role: true }
      });
      if (!user) {
        throw Error(JWT_ERRORS.NO_USER)
      }
      return done(null, user);
    } catch (error) {
      if (Object.values(JWT_ERRORS).includes(error?.message)) {
        return done(null, false, { message: error.message });
      }
      logger.info("Error on Passport JWT Auth", error);
      return done(error);
    }
  }
);