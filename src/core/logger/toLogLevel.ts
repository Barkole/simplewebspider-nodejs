import { LogLevel } from "./LogLevel";
import { UnknownLogLevelError } from "./UnknownLogLevelError";
export function toLogLevel(logLevel: string | undefined): LogLevel {
  if (logLevel === undefined || logLevel === null || logLevel === ``) {
    return `info`;
  }
  if (logLevel === `info` || logLevel === `debug` || logLevel === `silly`) {
    return logLevel;
  }
  throw new UnknownLogLevelError(`Unknown log level`, logLevel);
}
