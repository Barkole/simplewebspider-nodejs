import { config } from "./core/config";
import { logger } from "./core/logger";
import { crawler } from "./engine/crawler";
// import Errlop from "errlop";

process.on(`uncaughtException`, function (err) {
  // eslint-disable-next-line no-console
  console.log(`\n#####\n\nUncaught error`, err);
  logger.error(`\n##\nUncaught error`, err);
});

logger.info(`Build`, config.build);
logger.debug(`Configuration`, config);

logger.info(`Starting crawler...`);
crawler.run();
