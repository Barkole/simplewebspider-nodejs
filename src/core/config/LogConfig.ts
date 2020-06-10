import { IsNotEmpty } from "class-validator";
import { checkValidateSync } from "../utils";
import { ILogConfig } from "./ILogConfig";
import { LogLevel } from "./LogLevel";
export class LogConfig implements ILogConfig {
  constructor(that: ILogConfig) {
    this.level = that.level;
    checkValidateSync(this);
  }
  @IsNotEmpty()
  level: LogLevel;
}
