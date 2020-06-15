import { IsPositive, IsInt, IsDefined } from "class-validator";
import { logger } from "../../core/logger";
import { IDatabase } from "./IDatabase";
import { checkValidateSync } from "../../core/utils";
import { IDatabaseConfig } from "./IDatabaseConfig";

class LimitedMemoryDatabase implements IDatabase {
  @IsPositive()
  @IsInt()
  readonly size: number;

  @IsDefined()
  entries: string[];

  async pop(): Promise<string | undefined> {
    return this.entries.pop();
  }

  async push(...items: string[]): Promise<this> {
    logger.debug(`Add entry: ${items}`);
    this.entries.push(...items);
    while (this.entries.length > this.size) {
      this.entries.shift();
    }
    return this;
  }

  constructor(databaseConfig: IDatabaseConfig) {
    this.size = databaseConfig.size;
    this.entries = [];
    checkValidateSync(this);
  }
}

export { LimitedMemoryDatabase };
