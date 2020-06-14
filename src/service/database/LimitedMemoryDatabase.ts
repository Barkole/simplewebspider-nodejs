import { IsPositive, IsInt, IsDefined } from "class-validator";
import { log } from "../../core/logger";
import { IDatabase } from "./IDatabase";
import { checkValidateSync } from "../../core/utils";
import { IDatabaseConfig } from "./IDatabaseConfig";

class LimitedMemoryDatabase implements IDatabase {
  @IsPositive()
  @IsInt()
  readonly size: number;

  @IsDefined()
  entries: string[];

  pop(): string | undefined {
    return this.entries.pop();
  }

  push(value: string): this {
    log.debug(`Add entry: ${value}`);
    this.entries.push(value);
    if (this.entries.length > this.size) {
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
