import { IsNotEmpty } from "class-validator";
import { IBuildConfig } from "./IBuildConfig";
import { checkValidateSync } from "../utils";
export class BuildConfig implements IBuildConfig {
  constructor(that: IBuildConfig) {
    this.name = that.name;
    this.version = that.version;
    this.timestamp = that.timestamp;
    this.sha = that.sha;
    checkValidateSync(this);
  }
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  version: string;
  @IsNotEmpty()
  timestamp: string;
  @IsNotEmpty()
  sha: string;
}
