import { IsNotEmptyObject } from "class-validator";
import { checkValidateSync } from "../core/utils";
import { database } from "../database/memory";
import { bootstrapper, IBootstrapper } from "./bootstrapper";
import { logger } from "../core/logger";

interface ICrawler {
  run(): Promise<void>;
}

class SimplerCrawler implements ICrawler {
  @IsNotEmptyObject()
  database: IDatabase;
  @IsNotEmptyObject()
  bootstrapper: IBootstrapper;

  async run(): Promise<void> {
    try {
      logger.info(`Starting bootstrapping...`);
      await this.bootstrapper.run(this.database);
      // Start bots
    } catch (e) {
      logger.error(`Main runner failed`, e);
    }
  }

  constructor(database: IDatabase, bootstrapper: IBootstrapper) {
    this.database = database;
    this.bootstrapper = bootstrapper;
    checkValidateSync(this);
  }
}

const crawler = new SimplerCrawler(database, bootstrapper);

export { crawler };
