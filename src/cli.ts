import { config } from "./config.js";
import { logger } from "./logger.js";

logger.info(`Build ${JSON.stringify(config.build)}`);
logger.debug(`Configuration: ${JSON.stringify(config)}`);

const message = `Hello World ${config.username}:\nTEST: ${config.test}`;
logger.info(message);
