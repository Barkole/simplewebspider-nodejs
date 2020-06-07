import { IsNotEmptyObject } from "class-validator";
import { checkValidateSync } from "../core/utils";
import { database } from "../database/memory";
import { bootstrapper, IBootstrapper } from "./bootstrapper";

interface ICrawler {
  run(): Promise<void>;
}

class SimplerCrawler implements ICrawler {
  @IsNotEmptyObject()
  database: IDatabase;
  @IsNotEmptyObject()
  bootstrapper: IBootstrapper;

  async run(): Promise<void> {
    await this.bootstrapper.run(this.database);
    // Start bots
  }

  constructor(database: IDatabase, bootstrapper: IBootstrapper) {
    this.database = database;
    this.bootstrapper = bootstrapper;
    checkValidateSync(this);
  }
}

const crawler = new SimplerCrawler(database, bootstrapper);

export { crawler };
