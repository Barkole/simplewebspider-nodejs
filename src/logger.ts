import winston from "winston";

const level = process.env.LOG_LEVEL || `info`;

export const logger = winston.createLogger({
  levels: winston.config.cli.levels,
  transports: [new winston.transports.Console({ level: level })],
});
