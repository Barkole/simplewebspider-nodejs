import { IsNotEmptyObject } from "class-validator";
import fs from "fs-extra";
import { IDatabase } from "../database";
import { IBootstrapper } from "./IBootstrapper";
import { BootstrapError } from "./BootstrapError";
import { IBootstrapConfig } from "./IBootstrapConfig";
import { checkValidateSync } from "../../core/utils";

export class SimpleBootstrapper implements IBootstrapper {
  @IsNotEmptyObject()
  config: IBootstrapConfig;

  async run(database: IDatabase): Promise<void> {
    try {
      const filename = this.config.filename;
      const content = await fs.readFile(filename, `utf8`);
      content
        .split(/\r?\n/) //
        .filter(
          (line) =>
            line && (line.startsWith(`http://`) || line.startsWith(`https://`))
        ) //
        .forEach((line) => database.push(line));
    } catch (e) {
      throw new BootstrapError(
        `Bootstrapping failed [file=${this.config.filename}`,
        e
      );
    }
  }

  constructor(config: IBootstrapConfig) {
    this.config = config;
    checkValidateSync(this);
  }
}
