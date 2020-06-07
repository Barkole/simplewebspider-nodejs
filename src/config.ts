/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const additionalEnv = `${__dirname}/.env.override`;
if (fs.existsSync(additionalEnv)) {
  console.log(`Loading ${additionalEnv}...`);
  const envConfig = dotenv.parse(fs.readFileSync(additionalEnv));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} else {
  console.log(`No ${additionalEnv} found...`);
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

console.log(` ======== `);
console.log(`name: ${config.build.name}`);
console.log(`version: ${config.build.version}`);
console.log(`timestamp: ${config.build.timestamp}`);
console.log(`sha: ${config.build.sha}`);
console.log(` ======== `);
