/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";
import fs from "fs";
import { IsNotEmpty, IsInt, IsPositive, Min, Max } from "class-validator";
import { checkValidateSync } from "./utils";

type LogLevel = `debug` | `info`;
class EnvFileMissingError extends Error {
  filename: string | undefined;

  constructor(message?: string, filename?: string) {
    super(message);
    this.name = `EnvFileMissingError`;
    this.filename = filename;
  }
}

function loadConfig(filename: string): void {
  if (!fs.existsSync(filename)) {
    throw new EnvFileMissingError(`File does not exists`, filename);
  }

  const envConfig = dotenv.parse(fs.readFileSync(filename));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

interface IDatabaseConfig {
  readonly size: number;
}

class DatabaseConfig implements IDatabaseConfig {
  @IsPositive()
  @IsInt()
  size: number;

  constructor(that: IDatabaseConfig) {
    this.size = that.size;
    checkValidateSync(this);
  }
}

interface ILogConfig {
  readonly level: LogLevel;
}
class LogConfig implements ILogConfig {
  constructor(that: ILogConfig) {
    this.level = that.level;
    checkValidateSync(this);
  }
  @IsNotEmpty()
  level: LogLevel;
}

interface IBootstrapConfig {
  readonly filename: string;
}
class BootstrapConfig implements IBootstrapConfig {
  constructor(that: IBootstrapConfig) {
    this.filename = that.filename;
    checkValidateSync(this);
  }
  @IsNotEmpty()
  filename: string;
}

interface IHttpThrottlerConfig {
  readonly once: number;
  readonly max: number;
  readonly ttl: number;
}
class HttpThrottlerConfig implements IHttpThrottlerConfig {
  constructor(that: IHttpThrottlerConfig) {
    this.once = that.once;
    this.max = that.max;
    this.ttl = that.ttl;
    checkValidateSync(this);
  }
  @IsInt()
  @IsPositive()
  once: number;
  @IsInt()
  @Min(0)
  max: number;
  @IsInt()
  @Min(0)
  ttl: number;
}

interface IRequestThrottlerConfig {
  readonly concurrent: number;
  readonly perMinute: number;
}
class RequestThrottlerConfig implements IRequestThrottlerConfig {
  constructor(that: IRequestThrottlerConfig) {
    this.concurrent = that.concurrent;
    this.perMinute = that.perMinute;
    checkValidateSync(this);
  }
  @IsPositive()
  @IsInt()
  concurrent: number;
  @IsInt()
  @Min(0)
  perMinute: number;
}
interface IThrottlerConfig {
  readonly host: IHttpThrottlerConfig;
  readonly request: IRequestThrottlerConfig;
}

class ThrottlerConfig implements IThrottlerConfig {
  constructor(that: IThrottlerConfig) {
    this.host = new HttpThrottlerConfig(that.host);
    this.request = new RequestThrottlerConfig(that.request);
    checkValidateSync(this);
  }
  @IsNotEmpty()
  host: IHttpThrottlerConfig;
  @IsNotEmpty()
  request: IRequestThrottlerConfig;
}

interface IHttpConfig {
  readonly timeout: number;
}

class HttpConfig implements IHttpConfig {
  constructor(that: IHttpConfig) {
    this.timeout = that.timeout;
    checkValidateSync(this);
  }

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  timeout: number;
}

interface IBuildConfig {
  readonly name: string;
  readonly version: string;
  readonly timestamp: string;
  readonly sha: string;
}

class BuildConfig implements IBuildConfig {
  constructor(that: IBuildConfig) {
    this.name = that.name;
    this.version = that.version;
    this.timestamp = that.timestamp;
    this.sha = that.sha;
    checkValidateSync(this);
  }
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  version: string;
  @IsNotEmpty()
  timestamp: string;
  @IsNotEmpty()
  sha: string;
}

interface ISwsConfig {
  readonly username: string;
  readonly test: string;
  readonly log: ILogConfig;
  readonly bootstrap: IBootstrapConfig;
  readonly throttler: IThrottlerConfig;
  readonly http: IHttpConfig;
  readonly build: IBuildConfig;
  readonly database: IDatabaseConfig;
}

class SwsConfig implements ISwsConfig {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  test: string;
  @IsNotEmpty()
  log: ILogConfig;
  @IsNotEmpty()
  bootstrap: IBootstrapConfig;
  @IsNotEmpty()
  throttler: IThrottlerConfig;
  @IsNotEmpty()
  http: IHttpConfig;
  @IsNotEmpty()
  build: IBuildConfig;
  @IsNotEmpty()
  database: IDatabaseConfig;

  constructor(that: ISwsConfig) {
    this.username = that.username;
    this.test = that.test;
    this.log = new LogConfig(that.log);
    this.bootstrap = new BootstrapConfig(that.bootstrap);
    this.throttler = new ThrottlerConfig(that.throttler);
    this.http = new HttpConfig(that.http);
    this.build = new BuildConfig(that.build);
    this.database = new DatabaseConfig(that.database);
    checkValidateSync(this);
  }
}

class UnknownLogLevelError extends Error {
  logLevel: string | undefined;

  constructor(message?: string, logLevel?: string) {
    super(message);
    this.name = `UnknownLogLevelError`;
    this.logLevel = logLevel;
  }
}

function logLevel(logLevel: string | undefined): LogLevel | undefined {
  if (logLevel === undefined || logLevel === null || logLevel === ``) {
    return undefined;
  }
  if (logLevel === `info` || logLevel === `debug`) {
    return logLevel;
  }
  throw new UnknownLogLevelError(`Unknown log level`, logLevel);
}

class InvalidConfigurationError extends Error {
  e: Error | undefined;
  constructor(message?: string, e?: Error) {
    super(message);
    this.name = `InvalidConfigurationError`;
    this.e = e;
  }
}

function initializeConfiguration(): SwsConfig {
  try {
    dotenv.config();
    loadConfig(`${__dirname}/../.env.override`);

    return new SwsConfig({
      username: process.env.USERNAME!,
      test: process.env.TEST!,
      log: {
        level: logLevel(process.env.LOG_LEVEL) || `info`,
      },
      bootstrap: {
        filename: process.env.BOOTSTRAP_FILE || `bootstrap.txt`,
      },
      throttler: {
        host: {
          once: Number(process.env.THROTTLER_HOST_ONCE) || 20,
          max: Number(process.env.THROTTLER_HOST_MAX) || 1024,
          ttl: Number(process.env.THROTTLER_HOST_TTL) || 3600,
        },
        request: {
          concurrent: Number(process.env.THROTTLER_REQUEST_CONCURRENT) || 4,
          perMinute: Number(process.env.THROTTLER_REQUEST_PERMINUTE) || 10,
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
      database: {
        size: Number(process.env.DATABASE_SIZE) || 1024 * 1024,
      },
    });
  } catch (e) {
    throw new InvalidConfigurationError(`Configuration invalid`, e);
  }
}

const config = initializeConfiguration();

export {
  config,
  IBootstrapConfig,
  IBuildConfig,
  IHttpConfig,
  IHttpThrottlerConfig,
  ILogConfig,
  IRequestThrottlerConfig,
  ISwsConfig,
  IThrottlerConfig,
  SwsConfig,
  EnvFileMissingError,
  UnknownLogLevelError,
  InvalidConfigurationError,
  LogLevel,
};
