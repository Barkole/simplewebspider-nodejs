import { config } from "./core/config";
import { logger } from "./core/logger";
import { crawler } from "./engine/crawler";
// import Errlop from "errlop";

// process.on(`beforeExit`, (code) => { // THis cause an endless loop
//   // eslint-disable-next-line no-console
//   console.warn(`Before exit`, code);
//   logger.warn(`Before exit`, code);
// });
process.on(`disconnect`, () => {
  // eslint-disable-next-line no-console
  console.warn(`Disconnect`);
  logger.warn(`Disconnect`);
});
process.on(`exit`, (code) => {
  // eslint-disable-next-line no-console
  console.warn(`Exit`, code);
  logger.warn(`Exit`, code);
});
process.on(`uncaughtException`, function (err) {
  // eslint-disable-next-line no-console
  console.warn(`Uncaught error`, err);
  logger.warn(`Uncaught error`, err);
});
process.on(`uncaughtExceptionMonitor`, function (err) {
  // eslint-disable-next-line no-console
  console.warn(`Uncaught monitor error`, err);
  logger.warn(`Uncaught monitor error`, err);
});
process.on(`unhandledRejection`, (reason) => {
  // eslint-disable-next-line no-console
  console.warn(`Unhandled Rejection`, reason);
  logger.warn(`Unhandled Rejection`, reason);
});
process.on(`warning`, (warning) => {
  // eslint-disable-next-line no-console
  console.warn(`Warning`, warning);
  logger.warn(`Warning`, warning);
});
process.on(`message`, (message) => {
  // eslint-disable-next-line no-console
  console.warn(`Message`, message);
  logger.warn(`Message`, message);
});
process.on(`SIGABRT`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGABRT`, signal);
  logger.warn(`SIGABRT`, signal);
});
process.on(`SIGHUP`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGHUP`, signal);
  logger.warn(`SIGHUP`, signal);
});
process.on(`SIGINT`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGINT`, signal);
  logger.warn(`SIGINT`, signal);
});
process.on(`SIGKILL`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGKILL`, signal);
  logger.warn(`SIGKILL`, signal);
});
process.on(`SIGQUIT`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGQUIT`, signal);
  logger.warn(`SIGQUIT`, signal);
});
process.on(`SIGSTOP`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGSTOP`, signal);
  logger.warn(`SIGSTOP`, signal);
});
process.on(`SIGUSR1`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGUSR1`, signal);
  logger.warn(`SIGUSR1`, signal);
});
process.on(`SIGUSR2`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGUSR2`, signal);
  logger.warn(`SIGUSR2`, signal);
});
process.on(`SIGBREAK`, (signal) => {
  // eslint-disable-next-line no-console
  console.warn(`SIGBREAK`, signal);
  logger.warn(`SIGBREAK`, signal);
});

logger.info(`Build`, config.build);
logger.debug(`Configuration`, config);

logger.info(`Starting crawler...`);
crawler.run();
