import { IsNotEmpty } from "class-validator";
import { IBootstrapConfig } from "./IBootstrapConfig";
import { checkValidateSync } from "../../core/utils";
export class BootstrapConfig implements IBootstrapConfig {
  constructor(that: IBootstrapConfig) {
    this.filename = that.filename;
    checkValidateSync(this);
  }
  @IsNotEmpty()
  filename: string;
}
