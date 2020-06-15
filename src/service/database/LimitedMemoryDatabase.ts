import { IsDefined, IsInt, IsPositive } from "class-validator";
import { logger } from "../../core/logger";
import { checkValidateSync, randomInt } from "../../core/utils";
import { IDatabase } from "./IDatabase";
import { IDatabaseConfig } from "./IDatabaseConfig";

class LimitedMemoryDatabase implements IDatabase {
  @IsPositive()
  @IsInt()
  readonly size: number;

  // TODO has to be a Set
  @IsDefined()
  entries: Set<string>;

  async remove(): Promise<string | undefined> {
    const index = randomInt(0, this.entries.size);
    logger.silly(
      `Removing element [index=${index}, length=${this.entries.size}]`
    );
    let count = 0;
    let item = undefined;
    this.entries.forEach((value) => {
      if (count++ === index) {
        item = value;
      }
    });
    item && this.entries.delete(item);
    return item;
  }

  async add(...items: string[]): Promise<this> {
    logger.debug(`Add entry: ${items}`);
    items.forEach((item) => this.entries.add(item));
    while (this.entries.size > this.size) {
      this.entries.forEach((value, _value, set) => {
        if (set.size > this.size) {
          logger.silly(`Deleting entry [size=${set.size}, value=${value}]`);
          set.delete(value);
        }
      });
    }
    return this;
  }

  constructor(databaseConfig: IDatabaseConfig) {
    this.size = databaseConfig.size;
    this.entries = new Set();
    checkValidateSync(this);
  }
}

export { LimitedMemoryDatabase };
