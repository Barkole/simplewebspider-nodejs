import { IDatabaseConfig } from "../../service/database";
import { ILogConfig } from "../logger";
import { IBootstrapConfig } from "../../service/bootstrap";
import { IHttpConfig } from "./moveout/IHttpConfig";
import { IBuildConfig } from "./IBuildConfig";
import { IThrottlerConfig } from "./moveout/IThrottlerConfig";
export interface ISwsConfig {
  readonly log: ILogConfig;
  readonly bootstrap: IBootstrapConfig;
  readonly throttler: IThrottlerConfig;
  readonly http: IHttpConfig;
  readonly build: IBuildConfig;
  readonly database: IDatabaseConfig;
}
