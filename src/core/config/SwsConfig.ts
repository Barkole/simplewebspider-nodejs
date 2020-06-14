import { IsNotEmpty } from "class-validator";
import { checkValidateSync } from "../utils";
import { IDatabaseConfig, DatabaseConfig } from "../../service/database";
import { ILogConfig, LogConfig } from "../logger";
import { IBootstrapConfig, BootstrapConfig } from "../../service/bootstrap";
import { ThrottlerConfig } from "./moveout/ThrottlerConfig";
import { IHttpConfig } from "./moveout/IHttpConfig";
import { HttpConfig } from "./moveout/HttpConfig";
import { IBuildConfig } from "./IBuildConfig";
import { BuildConfig } from "./BuildConfig";
import { ISwsConfig } from "./ISwsConfig";
import { IThrottlerConfig } from "./moveout/IThrottlerConfig";

export class SwsConfig implements ISwsConfig {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  test: string;
  @IsNotEmpty()
  log: ILogConfig;
  @IsNotEmpty()
  bootstrap: IBootstrapConfig;
  @IsNotEmpty()
  throttler: IThrottlerConfig;
  @IsNotEmpty()
  http: IHttpConfig;
  @IsNotEmpty()
  build: IBuildConfig;
  @IsNotEmpty()
  database: IDatabaseConfig;

  constructor(that: ISwsConfig) {
    this.username = that.username;
    this.test = that.test;
    this.log = new LogConfig(that.log);
    this.bootstrap = new BootstrapConfig(that.bootstrap);
    this.throttler = new ThrottlerConfig(that.throttler);
    this.http = new HttpConfig(that.http);
    this.build = new BuildConfig(that.build);
    this.database = new DatabaseConfig(that.database);
    checkValidateSync(this);
  }
}
