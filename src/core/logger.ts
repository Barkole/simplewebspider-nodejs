import { createLogger, format, transports } from "winston";
import { consoleFormat } from "winston-console-format";
import { config } from "./config";

// export const logger = winston.createLogger({
//   levels: winston.config.cli.levels,
//   transports: [new winston.transports.Console({ level: config.log.level })],
// });

export const logger = createLogger({
  level: config.log.level,
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: `Test` },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: [`service`],
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
