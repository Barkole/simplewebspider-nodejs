import { IsInt, Min, Max } from "class-validator";
import { checkValidateSync } from "../../core/utils";
import { IDatabaseConfig } from "./IDatabaseConfig";
export class DatabaseConfig implements IDatabaseConfig {
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsInt()
  size: number;

  constructor(that: IDatabaseConfig) {
    this.size = that.size;
    checkValidateSync(this);
  }
}
