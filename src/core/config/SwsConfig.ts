import { IsDefined } from "class-validator";
import { checkValidateSync } from "../utils";
import { IDatabaseConfig, DatabaseConfig } from "../../service/database";
import { ILogConfig, LogConfig } from "../logger";
import { IBootstrapConfig, BootstrapConfig } from "../../service/bootstrap";
import { IBuildConfig } from "./IBuildConfig";
import { BuildConfig } from "./BuildConfig";
import { ISwsConfig } from "./ISwsConfig";
import { IQueueConfig, QueueConfig } from "../../service/queue";

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
