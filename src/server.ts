import { logger } from "./core/logger";
import { config } from "./core/config";
import { processOn } from "./core/processOn";
import { LimitedMemoryDatabase } from "./service/database";
import { SimpleBootstrapper } from "./service/bootstrap";
import { SimplerCrawler } from "./service/crawler";
import { SimpleExctractor as SimpleExtractor } from "./service/extractor";

// Update loglevel after loading configuration
// updateLogger(config.log); // TypeError: logger_1.updateLogger is not a function
logger.level = config.log.level;

logger.debug(`Initiate process on listeners...`);
processOn();

logger.info(`Build ${JSON.stringify(config.build)}`);
logger.debug(`Configuration ${JSON.stringify(config)}`);

logger.info(`Wire services`);
const bootstrapper = new SimpleBootstrapper(config.bootstrap);
const database = new LimitedMemoryDatabase(config.database);
const extractor = new SimpleExtractor();
const crawler = new SimplerCrawler(database, bootstrapper, extractor);

logger.info(`Starting crawler...`);
crawler.run();
