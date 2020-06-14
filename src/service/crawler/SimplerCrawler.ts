import { IsNotEmptyObject } from "class-validator";
import { IBootstrapper } from "../bootstrap";
import { log } from "../../core/logger";
import { IDatabase } from "../database";
import { ICrawler } from "./ICrawler";
import { checkValidateSync } from "../../core/utils";

export class SimplerCrawler implements ICrawler {
  @IsNotEmptyObject()
  database: IDatabase;
  @IsNotEmptyObject()
  bootstrapper: IBootstrapper;

  async run(): Promise<void> {
    try {
      log.info(`Starting bootstrapping...`);
      await this.bootstrapper.run(this.database);
      // Start bots
    } catch (e) {
      log.error(`Main runner failed`, e);
    }
  }

  constructor(database: IDatabase, bootstrapper: IBootstrapper) {
    this.database = database;
    this.bootstrapper = bootstrapper;
    checkValidateSync(this);
  }
}
