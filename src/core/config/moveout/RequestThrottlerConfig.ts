import { IsInt, IsPositive, Min } from "class-validator";
import { checkValidateSync } from "../../utils";
import { IRequestThrottlerConfig } from "./IRequestThrottlerConfig";
export class RequestThrottlerConfig implements IRequestThrottlerConfig {
  constructor(that: IRequestThrottlerConfig) {
    this.concurrent = that.concurrent;
    this.perMinute = that.perMinute;
    checkValidateSync(this);
  }
  @IsPositive()
  @IsInt()
  concurrent: number;
  @IsInt()
  @Min(0)
  perMinute: number;
}
