import { config } from "./core/config";
import { logger } from "./core/logger";
import { processOn } from "./core/processOn";
import { SimpleBootstrapper } from "./service/bootstrap";
import { SimplerCrawler } from "./service/crawler";
import { LimitedMemoryDatabase } from "./service/database";
import { SimpleExctractor as SimpleExtractor } from "./service/extractor";
import { PromiseQueue } from "./service/queue";

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
const queue = new PromiseQueue(config.queue);
const crawler = new SimplerCrawler(database, bootstrapper, extractor, queue);

logger.info(`Starting crawler...`);
crawler.run();
