import { PrismaClient } from '@prisma/client'
import { query } from 'winston';

import { IS_PRODUCTION } from './utilities';
import logger from './utilities/logger';

const prisma = new PrismaClient({
  // errorFormat: IS_PRODUCTION ? "minimal" : "pretty",
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: "event",
      level: "error"
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});
if (!IS_PRODUCTION) {
  prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    logger.info(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    );
    return result;
  })
  // prisma.$on("query", (e) => logger.info(`query log on DB Side`, e))
}
prisma.$on("info", (e) => logger.info(`info log on DB Side`, e))
prisma.$on("warn", (e) => logger.warn(`warning log on DB Side`, e))
prisma.$on("error", (e) => logger.error(`error log on DB Side`, e))
export default prisma