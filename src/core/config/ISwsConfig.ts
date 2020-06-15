import { IDatabaseConfig } from "../../service/database";
import { ILogConfig } from "../logger";
import { IBootstrapConfig } from "../../service/bootstrap";
import { IBuildConfig } from "./IBuildConfig";
import { IQueueConfig } from "../../service/queue";
export interface ISwsConfig {
  readonly log: ILogConfig;
  readonly bootstrap: IBootstrapConfig;
  readonly build: IBuildConfig;
  readonly database: IDatabaseConfig;
  readonly queue: IQueueConfig;
}
