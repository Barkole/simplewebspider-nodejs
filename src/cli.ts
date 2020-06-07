import { config } from "./core/config.js";
import { logger } from "./core/logger.js";

process.on(`uncaughtException`, function (err) {
  logger.error(`Uncaught error`, err);
});

setTimeout(() => {
  throw new Error(`Hacky`);
}, 0);

process.nextTick(() => {
  throw new Error(`Hacky`);
});

logger.info(`Build ${JSON.stringify(config.build)}`);
logger.debug(`Configuration: ${JSON.stringify(config)}`);

const message = `Hello World ${config.username}:\nTEST: ${config.test}`;
logger.info(message);
