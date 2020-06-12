import { logger } from "./core/logger";
import { config } from "./core/config";
import { crawler } from "./engine/crawler";
import { processOn } from "./core/processOn";

// Update loglevel after loading configuration
logger.level = config.log.level;

logger.debug(`Initiate process on listeners...`);
processOn();

logger.info(`Build`, config.build);
logger.debug(`Configuration`, config);

logger.info(`Starting crawler...`);
crawler.run();
