import { IsInt, Max, Min } from "class-validator";
import { checkValidateSync } from "../../core/utils";
import { IThrottlerQueueConfig } from "./IThrottlerQueueConfig";

export class ThrottlerQueueConfig implements IThrottlerQueueConfig {
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  readonly perMinute: number;

  constructor(that: IThrottlerQueueConfig) {
    this.perMinute = that.perMinute;
    checkValidateSync(this);
  }
}
