import { IsNotEmpty } from "class-validator";
import { checkValidateSync } from "../../core/utils";
import { IBootstrapConfig } from "./IBootstrapConfig";

export class BootstrapConfig implements IBootstrapConfig {
  constructor(that: IBootstrapConfig) {
    this.filename = that.filename;
    checkValidateSync(this);
  }
  @IsNotEmpty()
  filename: string;
}
