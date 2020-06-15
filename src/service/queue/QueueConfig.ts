import { IQueueConfig } from "./IQueueConfig";
import { checkValidateSync } from "../../core/utils";
import { IsInt, Max, IsPositive } from "class-validator";

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
