import { config } from "./core/config.js";
import { logger } from "./core/logger.js";

process.on(`uncaughtException`, function (err) {
  logger.error(`Uncaught error`, err);
});

class SimpleWrapError extends Error {
  cause: Error | undefined;
  details: string[] | undefined;
  constructor(message?: string, details?: string[], cause?: Error) {
    super(message);
    this.name = `SimpleWrapError`;
    this.details = details;
    this.cause = cause;
  }
}

setTimeout(() => {
  throw new SimpleWrapError(
    `Wrapped2`,
    [`Detail 3`, `Detail 4`],
    new SimpleWrapError(
      `Wrapped1`,
      [`Detail 1`, `Detail 2`],
      new Error(`Hacky`)
    )
  );
}, 0);

process.nextTick(() => {
  throw new Error(`Hacky`);
});

logger.info(`Build`, config.build);
logger.debug(`Configuration`, config);

const message = `Hello World ${config.username}:\nTEST: ${config.test}`;
logger.info(message);
