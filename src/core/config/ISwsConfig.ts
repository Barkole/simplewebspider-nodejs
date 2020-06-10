import { IDatabaseConfig } from "./IDatabaseConfig";
import { ILogConfig } from "./ILogConfig";
import { IBootstrapConfig } from "./IBootstrapConfig";
import { IThrottlerConfig } from "./IThrottlerConfig";
import { IHttpConfig } from "./IHttpConfig";
import { IBuildConfig } from "./IBuildConfig";
export interface ISwsConfig {
  readonly username: string;
  readonly test: string;
  readonly log: ILogConfig;
  readonly bootstrap: IBootstrapConfig;
  readonly throttler: IThrottlerConfig;
  readonly http: IHttpConfig;
  readonly build: IBuildConfig;
  readonly database: IDatabaseConfig;
}
