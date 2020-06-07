import winston from "winston";
import { config } from "./config";

export const logger = winston.createLogger({
  levels: winston.config.cli.levels,
  transports: [new winston.transports.Console({ level: config.log.level })],
});
