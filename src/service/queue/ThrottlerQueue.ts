import { IsDefined, IsInt, Max, Min } from "class-validator";
import { logger } from "../../core/logger";
import { checkValidateSync } from "../../core/utils";
import { IQueue } from "./IQueue";
import { IThrottlerQueueConfig } from "./IThrottlerQueueConfig";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Throttler {
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  readonly perMinute: number;
  @IsDefined()
  readonly times: number[];

  async next(): Promise<void> {
    if (this.perMinute <= 0) {
      return;
    }

    const wait = this.cleanup();
    logger.debug(`Waiting [milliseconds=${wait}]`);
    await sleep(wait);
    this.put();
  }

  cleanup(): number {
    const oneMinuteAgo = Date.now() - 60 * 1000;

    while (this.times.length >= this.perMinute) {
      const entry = this.times.shift();
      logger.silly(`Removed entry [entry=${entry}, size=${this.times.length}]`);
      if (entry === undefined) {
        return 0;
      }
      if (entry >= oneMinuteAgo) {
        return entry - oneMinuteAgo;
      }
    }

    return 0;
  }

  put(): void {
    this.times.push(Date.now());
  }

  constructor(config: IThrottlerQueueConfig) {
    this.perMinute = config.perMinute;
    this.times = [];
    checkValidateSync(this);
  }
}

class ThrottlerQueue implements IQueue {
  @IsDefined()
  readonly queue: IQueue;

  @IsDefined()
  readonly throttler: Throttler;

  async add(func: (this: void) => Promise<void>): Promise<void> {
    await this.throttler.next();
    await this.queue.add(func);
  }

  constructor(queue: IQueue, config: IThrottlerQueueConfig) {
    this.queue = queue;
    this.throttler = new Throttler(config);
    checkValidateSync(this);
  }
}

export { ThrottlerQueue };
