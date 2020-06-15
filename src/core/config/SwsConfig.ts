import { IsDefined } from "class-validator";
import { BootstrapConfig, IBootstrapConfig } from "../../service/bootstrap";
import { DatabaseConfig, IDatabaseConfig } from "../../service/database";
import { IQueueConfig, QueueConfig } from "../../service/queue";
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

  constructor(that: ISwsConfig) {
    this.log = new LogConfig(that.log);
    this.bootstrap = new BootstrapConfig(that.bootstrap);
    this.build = new BuildConfig(that.build);
    this.database = new DatabaseConfig(that.database);
    this.queue = new QueueConfig(that.queue);
    checkValidateSync(this);
  }
}
