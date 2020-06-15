import { IsDefined } from "class-validator";
import { IBootstrapper } from "../bootstrap";
import { logger } from "../../core/logger";
import { IDatabase } from "../database";
import { ICrawler } from "./ICrawler";
import { checkValidateSync } from "../../core/utils";
import { IExtractor } from "../extractor";

export class SimplerCrawler implements ICrawler {
  @IsDefined()
  database: IDatabase;
  @IsDefined()
  bootstrapper: IBootstrapper;
  @IsDefined()
  extractor: IExtractor;

  async run(): Promise<void> {
    try {
      logger.info(`Starting bootstrapping...`);
      await this.bootstrapper.run(this.database);
      // Start bots
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const url = await this.database.remove();
        if (url === undefined) {
          logger.info(`Restarting bootstrapping...`);
          await this.bootstrapper.run(this.database);
          continue;
        }
        logger.info(`Processing ${url}`);
        const urls = await this.extractor.extract(url);
        this.database.add(...urls);
      }
    } catch (e) {
      logger.error(`Main runner failed`, e);
    }
  }

  constructor(
    database: IDatabase,
    bootstrapper: IBootstrapper,
    extractor: IExtractor
  ) {
    this.database = database;
    this.bootstrapper = bootstrapper;
    this.extractor = extractor;
    checkValidateSync(this);
  }
}
