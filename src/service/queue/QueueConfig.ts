import { IQueueConfig } from "./IQueueConfig";
import { checkValidateSync } from "../../core/utils";
import { IsInt, Min, Max } from "class-validator";

export class QueueConfig implements IQueueConfig {
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  parallel: number;

  constructor(that: IQueueConfig) {
    this.parallel = that.parallel;
    checkValidateSync(this);
  }
}
