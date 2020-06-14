import { IsInt, IsPositive, Min } from "class-validator";
import { checkValidateSync } from "../../utils";
import { IHttpThrottlerConfig } from "./IHttpThrottlerConfig";
export class HttpThrottlerConfig implements IHttpThrottlerConfig {
  constructor(that: IHttpThrottlerConfig) {
    this.once = that.once;
    this.max = that.max;
    this.ttl = that.ttl;
    checkValidateSync(this);
  }
  @IsInt()
  @IsPositive()
  once: number;
  @IsInt()
  @Min(0)
  max: number;
  @IsInt()
  @Min(0)
  ttl: number;
}
