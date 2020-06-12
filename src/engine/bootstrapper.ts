import { IsNotEmptyObject } from "class-validator";
import { IBootstrapConfig, config } from "../core/config";
import { checkValidateSync } from "../core/utils";
import fs from "fs-extra";
import Errlop from "errlop";

interface IBootstrapper {
  run(database: IDatabase): Promise<void>;
}

class BootstrapError extends Errlop {
  filename: string | undefined;

  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

class Bootstrapper implements IBootstrapper {
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

const bootstrapper = new Bootstrapper(config.bootstrap);

export { bootstrapper, IBootstrapper };
