import { config } from "./core/config";
import { logger } from "./core/logger";
import { crawler } from "./engine/crawler";
// import Errlop from "errlop";

process.on(`uncaughtException`, function (err) {
  // eslint-disable-next-line no-console
  console.log(`\n#####\n\nUncaught error`, err);
  logger.error(`\n##\nUncaught error`, err);
});

// class SimpleWrapError extends Error {
//   cause: Error | undefined;
//   details: string[] | undefined;
//   constructor(message?: string, details?: string[], cause?: Error) {
//     super(message);
//     this.name = `SimpleWrapError`;
//     this.details = details;
//     this.cause = cause;
//   }
// }

// setTimeout(() => {
//   const error1 = new SimpleWrapError(
//     `Wrapped1`,
//     [`Detail 1`, `Detail 2`],
//     new Error(`Hacky`)
//   );
//   const error2 = new SimpleWrapError(
//     `Wrapped2`,
//     [`Detail 3`, `Detail 4`],
//     error1
//   );
//   throw error2;
// }, 0);

// class MyErrlop extends Errlop {
//   details: string[] | undefined;
//   constructor(message: string, details?: string[], cause?: Error) {
//     super(message, cause);
//     this.name = `MyErrlop`;
//     this.details = details;
//   }
// }

// setTimeout(() => {
//   const error1 = new Error(`MyErrlop0`);
//   const error2 = new MyErrlop(`MyErrlop1`, [`Detail 1`, `Detail 2`], error1);
//   const error3 = new MyErrlop(`MyErrlop2`, [`Detail 3`, `Detail 4`], error2);
//   throw error3;
// }, 0);

// process.nextTick(() => {
//   throw new Error(`Hacky`);
// });

// process.nextTick(() => {
//   const error1 = new Errlop(`Errlop21`);
//   const error2 = new Errlop(`Errlop2`, error1);
//   throw error2;
// });
logger.info(`Build`, config.build);
logger.debug(`Configuration`, config);

logger.info(`Starting crawler...`);
crawler.run();
