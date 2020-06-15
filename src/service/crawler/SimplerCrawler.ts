import { IsDefined } from "class-validator";
import Errlop from "errlop";
import { logger } from "../../core/logger";
import { checkValidateSync } from "../../core/utils";
import { IBootstrapper } from "../bootstrap";
import { IDatabase } from "../database";
import { IExtractor } from "../extractor";
import { IQueue } from "../queue";
import { ICrawler } from "./ICrawler";

export class SimplerCrawler implements ICrawler {
  @IsDefined()
  database: IDatabase;
  @IsDefined()
  bootstrapper: IBootstrapper;
  @IsDefined()
  extractor: IExtractor;
  @IsDefined()
  queue: IQueue;

  async run(): Promise<void> {
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // TODO Implement throttler
        await this.queue.add(() => this.execute());
      }
    } catch (e) {
      logger.error(`Main runner failed`, e);
    }
  }

  async execute(): Promise<void> {
    try {
      // TODO Wrap database with host throttler
      const url = await this.database.remove();
      if (url === undefined) {
        logger.info(`Bootstrapping...`);
        await this.bootstrapper.run(this.database);
        return;
      }

      try {
        logger.info(`Processing ${url}`);
        const urls = await this.extractor.extract(url);

        // TODO Implement filtering of urls: only http and https; no local IPs

        this.database.add(...urls);
      } catch (e) {
        throw new Errlop(`Failed to process [url=${url}]`, e);
      }
    } catch (e) {
      logger.warn(`Failed to execute`, e);
    }
  }

  constructor(
    database: IDatabase,
    bootstrapper: IBootstrapper,
    extractor: IExtractor,
    queue: IQueue
  ) {
    this.database = database;
    this.bootstrapper = bootstrapper;
    this.extractor = extractor;
    this.queue = queue;
    checkValidateSync(this);
  }
}
