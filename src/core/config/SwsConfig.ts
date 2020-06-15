import { IsDefined } from "class-validator";
import { BootstrapConfig, IBootstrapConfig } from "../../service/bootstrap";
import { DatabaseConfig, IDatabaseConfig } from "../../service/database";
import {
  IQueueConfig,
  IThrottlerQueueConfig,
  QueueConfig,
  // eslint-disable-next-line prettier/prettier
  ThrottlerQueueConfig
} from "../../service/queue";
import { ILogConfig, LogConfig } from "../logger";
import { checkValidateSync } from "../utils";
import { BuildConfig } from "./BuildConfig";
import { IBuildConfig } from "./IBuildConfig";
import { ISwsConfig } from "./ISwsConfig";

export class SwsConfig implements ISwsConfig {
  @IsDefined()
  log: ILogConfig;
  @IsDefined()
  bootstrap: IBootstrapConfig;
  @IsDefined()
  build: IBuildConfig;
  @IsDefined()
  database: IDatabaseConfig;
  @IsDefined()
  queue: IQueueConfig;
  @IsDefined()
  throttlerQueue: IThrottlerQueueConfig;

  constructor(that: ISwsConfig) {
    this.log = new LogConfig(that.log);
    this.bootstrap = new BootstrapConfig(that.bootstrap);
    this.build = new BuildConfig(that.build);
    this.database = new DatabaseConfig(that.database);
    this.queue = new QueueConfig(that.queue);
    this.throttlerQueue = new ThrottlerQueueConfig(that.throttlerQueue);
    checkValidateSync(this);
  }
}
