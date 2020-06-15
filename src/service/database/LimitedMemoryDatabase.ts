import { IsPositive, IsInt, IsDefined } from "class-validator";
import { logger } from "../../core/logger";
import { IDatabase } from "./IDatabase";
import { checkValidateSync, randomInt } from "../../core/utils";
import { IDatabaseConfig } from "./IDatabaseConfig";

class LimitedMemoryDatabase implements IDatabase {
  @IsPositive()
  @IsInt()
  readonly size: number;

  @IsDefined()
  entries: string[];

  async remove(): Promise<string | undefined> {
    const index = randomInt(0, this.entries.length);
    logger.silly(
      `Removing element [index=${index}, length=${this.entries.length}]`
    );
    const items = this.entries.splice(index, 1);
    const item = items[0];
    return item;
  }

  async add(...items: string[]): Promise<this> {
    logger.debug(`Add entry: ${items}`);
    this.entries.push(...items);
    while (this.entries.length > this.size) {
      const removed = this.entries.shift();
      logger.debug(`Discard: ${removed}`);
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
