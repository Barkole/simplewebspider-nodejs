import { IsNotEmpty } from "class-validator";
import { checkValidateSync } from "../utils";
import { IHttpThrottlerConfig } from "./IHttpThrottlerConfig";
import { HttpThrottlerConfig } from "./HttpThrottlerConfig";
import { IRequestThrottlerConfig } from "./IRequestThrottlerConfig";
import { RequestThrottlerConfig } from "./RequestThrottlerConfig";
import { IThrottlerConfig } from "./IThrottlerConfig";
export class ThrottlerConfig implements IThrottlerConfig {
  constructor(that: IThrottlerConfig) {
    this.host = new HttpThrottlerConfig(that.host);
    this.request = new RequestThrottlerConfig(that.request);
    checkValidateSync(this);
  }
  @IsNotEmpty()
  host: IHttpThrottlerConfig;
  @IsNotEmpty()
  request: IRequestThrottlerConfig;
}
