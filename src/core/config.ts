/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";
import fs from "fs";

function loadConfig(filename: string): void {
  if (fs.existsSync(filename)) {
    // logger.info(`Loading ${filename}...`);
    const envConfig = dotenv.parse(fs.readFileSync(filename));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
    // } else {
    //   logger.info(`No ${filename} found...`);
  }
}

dotenv.config();
loadConfig(`${__dirname}/.env.override`);

export const config = {
  username: process.env.USERNAME!,
  test: process.env.TEST || `DEFAULT`,
  log: {
    level: process.env.LOG_LEVEL || `info`,
  },
  bootstrap: {
    file: process.env.BOOTSTRAP_FILE || `bootstrap.txt`,
  },
  throttler: {
    host: {
      once: Number(process.env.THROTTLER_HOST_ONCE) || 20,
      max: Number(process.env.THROTTLER_HOST_MAX) || 1024,
      ttl: Number(process.env.THROTTLER_HOST_TTL) || 3600,
    },
    request: {
      concurrent: Number(process.env.THROTTLER_REQUEST_CONCURRENT) || 4,
      "per-minute": Number(process.env.THROTTLER_REQUEST_PERMINUTE) || 10,
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
};
