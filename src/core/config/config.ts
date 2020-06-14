/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";
import fs from "fs-extra";
import { EnvFileMissingError } from "./EnvFileMissingError";
import { SwsConfig } from "./SwsConfig";
import { InvalidConfigurationError } from "./InvalidConfigurationError";
import { toLogLevel } from "../logger";
import { envOverride } from "../../resources";

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
      username: process.env.USERNAME!,
      log: {
        level: toLogLevel(process.env.LOG_LEVEL),
      },
      bootstrap: {
        filename: process.env.BOOTSTRAP_FILE || `bootstrap.txt`,
      },
      throttler: {
        host: {
          once: Number(process.env.THROTTLER_HOST_ONCE) || 20,
          max: Number(process.env.THROTTLER_HOST_MAX) || 1024,
          ttl: Number(process.env.THROTTLER_HOST_TTL) || 3600,
        },
        request: {
          concurrent: Number(process.env.THROTTLER_REQUEST_CONCURRENT) || 4,
          perMinute: Number(process.env.THROTTLER_REQUEST_PERMINUTE) || 10,
        },
      },
      http: {
        timeout: Number(process.env.HTTP_TIMEOUT) || 30,
      },
      build: {
        name: process.env.BUILD_NAME!,
        version: process.env.BUILD_VERSION!,
        timestamp: process.env.BUILD_TIMESTAMP!,
        sha: process.env.BUILD_SHA!,
      },
      database: {
        size: Number(process.env.DATABASE_SIZE) || 1024 * 1024,
      },
    });
  } catch (e) {
    throw new InvalidConfigurationError(`Configuration invalid`, e);
  }
}

const config = initializeConfiguration();

export { config };
