// import winston from "winston";
// import { config } from "./config";

// export const logger = winston.createLogger({
//   levels: winston.config.cli.levels,
//   transports: [new winston.transports.Console({ level: config.log.level })],
// });

import { createLogger, format, transports } from "winston";
import { consoleFormat } from "winston-console-format";
import { LogConfig } from "./LogConfig";
import { toLogLevel } from "./toLogLevel";

const logConfig = new LogConfig({
  level: toLogLevel(process.env.LOG_LEVEL),
});

export const logger = createLogger({
  level: logConfig.level,
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: {
    // TODO Inject meta afterwards
    // buildName: config.build.name,
    // buildTimestamp: config.build.timestamp,
    // buildVersion: config.build.version,
    // buildSha: config.build.sha,
  },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: [
            `buildName`,
            `buildTimestamp`,
            `buildVersion`,
            `buildSha`,
            `parent`, // from error instance how to avoid this without blacklisting here?
            `ancestors`, // from error instance how to avoid this without blacklisting here?
            `orphanStack`, // from error instance how to avoid this without blacklisting here?
            `klass`, // from error instance how to avoid this without blacklisting here?
            `cause`, // from error instance how to avoid this without blacklisting here?
            `filename`, // from error instance how to avoid this without blacklisting here?
          ],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        })
      ),
    }),
  ],
});
