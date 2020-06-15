import { IQueue } from "./IQueue";
import { IsDefined, IsInt, Min, Max } from "class-validator";
import { checkValidateSync } from "../../core/utils";
import { logger } from "../../core/logger";
import { v4 as uuid } from "uuid";
import { IQueueConfig } from "./IQueueConfig";

export class PromiseQueue implements IQueue {
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  readonly parallel: number;
  @IsDefined()
  readonly queue: Map<string, Promise<void>>;

  async add(func: (this: void) => Promise<void>): Promise<void> {
    const id = uuid();
    logger.silly(`Enqueue [id=${id}, size=${this.queue.size}]`);
    this.queue.set(
      id,
      (async (queue: Map<string, unknown>, id: string): Promise<void> => {
        logger.silly(`Starting [id=${id}, size=${this.queue.size}]`);
        try {
          await func();
        } catch (e) {
          logger.warn(`Execution failed ${id}`, e);
        } finally {
          logger.silly(`Removing [id=${id}, size=${this.queue.size}]`);
          queue.delete(id);
        }
      })(this.queue, id)
    );
    if (this.queue.size >= this.parallel) {
      logger.silly(`Waiting... [size=${this.queue.size}]`);
      // We would need Promise.any()
      await Promise.all(this.queue.values());
      logger.silly(`Continue... [size=${this.queue.size}]`);
    }
  }

  constructor(config: IQueueConfig) {
    this.queue = new Map();
    this.parallel = config.parallel;
    checkValidateSync(this);
  }
}
