/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";
import fs from "fs";
import { logger } from "./logger";

dotenv.config();

const additionalEnv = `${__dirname}/.env.override`;
if (fs.existsSync(additionalEnv)) {
  logger.info(`Loading ${additionalEnv}...`);
  const envConfig = dotenv.parse(fs.readFileSync(additionalEnv));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} else {
  logger.info(`No ${additionalEnv} found...`);
}

export const config = {
  username: process.env.USERNAME!,
  build: {
    name: process.env.BUILD_NAME!,
    version: process.env.BUILD_VERSION!,
    timestamp: process.env.BUILD_TIMESTAMP,
    sha: process.env.BUILD_SHA,
  },
};

logger.info(`Build ${JSON.stringify(config.build)}`);
