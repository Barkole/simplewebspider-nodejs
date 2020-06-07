import { config } from "./core/config.js";
import { logger } from "./core/logger.js";

logger.info(`Build ${JSON.stringify(config.build)}`);
logger.debug(`Configuration: ${JSON.stringify(config)}`);

const message = `Hello World ${config.username}:\nTEST: ${config.test}`;
logger.info(message);
