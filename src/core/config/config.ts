/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";
import fs from "fs-extra";
import { envOverride } from "../../resources";
import { toLogLevel } from "../logger";
import { EnvFileMissingError } from "./EnvFileMissingError";
import { InvalidConfigurationError } from "./InvalidConfigurationError";
import { SwsConfig } from "./SwsConfig";

function loadConfig(filename: string): void {
  if (!fs.existsSync(filename)) {
    throw new EnvFileMissingError(`File does not exists`, filename);
  }

  const envConfig = dotenv.parse(fs.readFileSync(filename));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

function initializeConfiguration(): SwsConfig {
  try {
    dotenv.config();
    loadConfig(envOverride);

    return new SwsConfig({
      build: {
        name: process.env.BUILD_NAME!,
        version: process.env.BUILD_VERSION!,
        timestamp: process.env.BUILD_TIMESTAMP!,
        sha: process.env.BUILD_SHA!,
      },
      log: {
        level: toLogLevel(process.env.LOG_LEVEL),
      },
      bootstrap: {
        filename: process.env.BOOTSTRAP_FILE || `bootstrap.txt`,
      },
      database: {
        size: Number(process.env.DATABASE_SIZE) || 1024 * 1024,
      },
      queue: {
        parallel: Number(process.env.QUEUE_PARALLEL) || 4,
      },
      throttlerQueue: {
        perMinute: Number(process.env.QUEUE_THROTTLE) || 10,
      },
    });
  } catch (e) {
    throw new InvalidConfigurationError(`Configuration invalid`, e);
  }
}

const config = initializeConfiguration();

export { config };
