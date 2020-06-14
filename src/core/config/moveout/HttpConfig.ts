import { IsInt, Min, Max } from "class-validator";
import { checkValidateSync } from "../../utils";
import { IHttpConfig } from "./IHttpConfig";
export class HttpConfig implements IHttpConfig {
  constructor(that: IHttpConfig) {
    this.timeout = that.timeout;
    checkValidateSync(this);
  }

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  timeout: number;
}
