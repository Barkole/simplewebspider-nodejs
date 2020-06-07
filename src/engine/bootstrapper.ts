import { IsNotEmptyObject } from "class-validator";
import { IBootstrapConfig, config } from "../core/config";
import { checkValidateSync } from "../core/utils";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

interface IBootstrapper {
  run(database: IDatabase): Promise<void>;
}

class BootstrapError extends Error {
  filename: string | undefined;
  cause: Error | undefined;

  constructor(message?: string, filename?: string, cause?: Error) {
    super(message);
    this.filename = filename;
    this.cause = cause;
  }
}

class Bootstrapper implements IBootstrapper {
  @IsNotEmptyObject()
  #config: IBootstrapConfig;

  async run(database: IDatabase): Promise<void> {
    try {
      const filename = this.#config.filename;
      const content = await readFile(filename, `uft8`);
      content
        .split(/\r?\n/) //
        .filter(
          (line) =>
            line && (line.startsWith(`http://`) || line.startsWith(`https://`))
        ) //
        .forEach(database.push);
    } catch (e) {
      throw new BootstrapError(
        `Bootstrapping failed`,
        this.#config.filename,
        e
      );
    }
  }

  constructor(config: IBootstrapConfig) {
    this.#config = config;
    checkValidateSync(this);
  }
}

const bootstrapper = new Bootstrapper(config.bootstrap);

export { bootstrapper, IBootstrapper };
