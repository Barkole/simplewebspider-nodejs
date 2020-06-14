import { logger } from "./core/logger";
import { config } from "./core/config";
import { processOn } from "./core/processOn";
import { LimitedMemoryDatabase } from "./service/database";
import { SimpleBootstrapper } from "./service/bootstrap";
import { SimplerCrawler } from "./service/crawler";

// Update loglevel after loading configuration
logger.level = config.log.level;

logger.debug(`Initiate process on listeners...`);
processOn();

logger.info(`Build`, config.build);
logger.debug(`Configuration`, config);

const bootstrapper = new SimpleBootstrapper(config.bootstrap);
const database = new LimitedMemoryDatabase(config.database);

logger.info(`Starting crawler...`);
const crawler = new SimplerCrawler(database, bootstrapper);
crawler.run();
