import { IsInt, IsPositive, Max } from "class-validator";
import { checkValidateSync } from "../../core/utils";
import { IDatabaseConfig } from "./IDatabaseConfig";

export class DatabaseConfig implements IDatabaseConfig {
  @IsPositive()
  @Max(Number.MAX_SAFE_INTEGER)
  @IsInt()
  size: number;

  constructor(that: IDatabaseConfig) {
    this.size = that.size;
    checkValidateSync(this);
  }
}
