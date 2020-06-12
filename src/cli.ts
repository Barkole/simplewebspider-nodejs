import { config } from "./core/config";
import { logger } from "./core/logger";
import { crawler } from "./engine/crawler";
// import Errlop from "errlop";

process.on(`uncaughtException`, function (err) {
  // eslint-disable-next-line no-console
  console.warn(`Uncaught error`, err);
  logger.warn(`Uncaught error`, err);
});
process.on(`unhandledRejection`, (reason) => {
  // eslint-disable-next-line no-console
  console.warn(`Unhandled Rejection`, reason);
  logger.warn(`Unhandled Rejection`, reason);
});

logger.info(`Build`, config.build);
logger.debug(`Configuration`, config);

logger.info(`Starting crawler...`);
crawler.run();
