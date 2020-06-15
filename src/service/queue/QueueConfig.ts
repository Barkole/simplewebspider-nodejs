import { IsInt, IsPositive, Max } from "class-validator";
import { checkValidateSync } from "../../core/utils";
import { IQueueConfig } from "./IQueueConfig";

export class QueueConfig implements IQueueConfig {
  @IsInt()
  @IsPositive()
  @Max(Number.MAX_SAFE_INTEGER)
  parallel: number;

  constructor(that: IQueueConfig) {
    this.parallel = that.parallel;
    checkValidateSync(this);
  }
}
