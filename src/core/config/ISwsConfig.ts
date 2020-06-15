import { IBootstrapConfig } from "../../service/bootstrap";
import { IDatabaseConfig } from "../../service/database";
import { IQueueConfig, IThrottlerQueueConfig } from "../../service/queue";
import { ILogConfig } from "../logger";
import { IBuildConfig } from "./IBuildConfig";

export interface ISwsConfig {
  readonly log: ILogConfig;
  readonly bootstrap: IBootstrapConfig;
  readonly build: IBuildConfig;
  readonly database: IDatabaseConfig;
  readonly queue: IQueueConfig;
  readonly throttlerQueue: IThrottlerQueueConfig;
}
