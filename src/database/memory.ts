import { IsPositive, IsInt } from "class-validator";
import { checkValidateSync } from "../core/utils";
import { config } from "../core/config";
import { logger } from "../core/logger";

class LimitedMemoryDatabase implements IDatabase {
  @IsPositive()
  @IsInt()
  readonly limit: number;

  #entries: string[];

  pop(): string | undefined {
    return this.#entries.pop();
  }
  push(value: string): this {
    logger.debug(`Add entry: ${value}`);
    this.#entries.push(value);
    if (this.#entries.length > this.limit) {
      this.#entries.shift();
    }
    return this;
  }

  constructor(limit: number) {
    this.limit = limit;
    this.#entries = [];
    checkValidateSync(this);
  }
}

const database = new LimitedMemoryDatabase(config.database.size);

export { database };
