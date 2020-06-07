import { config } from "./config.js";
import { logger } from "./logger.js";

const message = `Hello World ${config.username}:\ntimestamp: ${config.build.timestamp}`;
logger.info(message);
