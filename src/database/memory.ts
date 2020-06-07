import { IsPositive, IsInt } from "class-validator";
import { checkValidateSync } from "../core/utils";
import { config } from "../core/config";

class LimitedMemoryDatabase implements Database {
  @IsPositive()
  @IsInt()
  readonly limit: number;

  #entries: string[];

  pop(): string | undefined {
    return this.#entries.pop();
  }
  push(value: string): this {
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
