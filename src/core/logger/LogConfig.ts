import { IsNotEmpty } from "class-validator";
import { ILogConfig } from "./ILogConfig";
import { LogLevel } from "./LogLevel";
import { checkValidateSync } from "../utils";

export class LogConfig implements ILogConfig {
  constructor(that: ILogConfig) {
    this.level = that.level;
    checkValidateSync(this);
  }
  @IsNotEmpty()
  level: LogLevel;
}
