import { ILogConfig } from "./ILogConfig";
import { logger } from "./logger";

export function updateLogger(logConfig: ILogConfig): void {
  logger.level = logConfig.level;
}
