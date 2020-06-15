import { IsDefined } from "class-validator";
import fs from "fs-extra";
import { checkValidateSync } from "../../core/utils";
import { IDatabase } from "../database";
import { BootstrapError } from "./BootstrapError";
import { IBootstrapConfig } from "./IBootstrapConfig";
import { IBootstrapper } from "./IBootstrapper";

export class SimpleBootstrapper implements IBootstrapper {
  @IsDefined()
  config: IBootstrapConfig;

  async run(database: IDatabase): Promise<void> {
    try {
      // TODO Implement embedded default bootstrapping file
      const filename = this.config.filename;
      const content = await fs.readFile(filename, `utf8`);
      content
        .split(/\r?\n/) //
        .filter(
          (line) =>
            line && (line.startsWith(`http://`) || line.startsWith(`https://`))
        ) //
        .forEach((line) => database.add(line));
      // TODO Ensure at least one line was added
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
