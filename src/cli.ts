import { log } from "./core/logger";
import { config } from "./core/config";
import { processOn } from "./core/processOn";
import { LimitedMemoryDatabase } from "./service/database";
import { SimpleBootstrapper } from "./service/bootstrap";
import { SimplerCrawler } from "./service/crawler";

// Update loglevel after loading configuration
log.level = config.log.level;

log.debug(`Initiate process on listeners...`);
processOn();

log.info(`Build`, config.build);
log.debug(`Configuration`, config);

log.info(`Wire services`);
const bootstrapper = new SimpleBootstrapper(config.bootstrap);
const database = new LimitedMemoryDatabase(config.database);
const crawler = new SimplerCrawler(database, bootstrapper);

log.info(`Starting crawler...`);
crawler.run();
