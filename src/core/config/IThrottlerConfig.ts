import { IHttpThrottlerConfig } from "./IHttpThrottlerConfig";
import { IRequestThrottlerConfig } from "./IRequestThrottlerConfig";
export interface IThrottlerConfig {
  readonly host: IHttpThrottlerConfig;
  readonly request: IRequestThrottlerConfig;
}
