import { IsInt, IsPositive } from "class-validator";
import { checkValidateSync } from "../utils";
import { IDatabaseConfig } from "./IDatabaseConfig";
export class DatabaseConfig implements IDatabaseConfig {
  @IsPositive()
  @IsInt()
  size: number;

  constructor(that: IDatabaseConfig) {
    this.size = that.size;
    checkValidateSync(this);
  }
}
