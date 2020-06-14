import { LogLevel } from "./LogLevel";
import { UnknownLogLevelError } from "./UnknownLogLevelError";
export function toLogLevel(logLevel: string | undefined): LogLevel | undefined {
  if (logLevel === undefined || logLevel === null || logLevel === ``) {
    return undefined;
  }
  if (logLevel === `info` || logLevel === `debug`) {
    return logLevel;
  }
  throw new UnknownLogLevelError(`Unknown log level`, logLevel);
}
