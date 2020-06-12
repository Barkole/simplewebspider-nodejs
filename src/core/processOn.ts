import { logger } from "./logger";

// process.on(`beforeExit`, (code) => { // THis cause an endless loop
//   // eslint-disable-next-line no-console
//   console.warn(`Before exit`, code);
//   logger.warn(`Before exit`, code);
// });

function processOn(): void {
  process.on(`disconnect`, () => {
    // eslint-disable-next-line no-console
    console.warn(`Disconnect`);
    logger.warn(`Disconnect`);
  });
  process.on(`exit`, (code) => {
    // eslint-disable-next-line no-console
    console.warn(`Exit ${code}`);
    logger.warn(`Exit ${code}`);
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
    console.warn(`Unhandled Rejection ${JSON.stringify(reason)}`);
    logger.warn(`Unhandled Rejection ${JSON.stringify(reason)}`);
  });
  process.on(`warning`, (warning) => {
    // eslint-disable-next-line no-console
    console.warn(`Warning`, warning);
    logger.warn(`Warning`, warning);
  });
  process.on(`message`, (message) => {
    // eslint-disable-next-line no-console
    console.warn(`Message ${JSON.stringify(message)}`);
    logger.warn(`Message ${JSON.stringify(message)}`);
  });
  process.on(`SIGABRT`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
  process.on(`SIGHUP`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
  process.on(`SIGINT`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
  process.on(`SIGKILL`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
  process.on(`SIGQUIT`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
  process.on(`SIGSTOP`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
  process.on(`SIGUSR1`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
  process.on(`SIGUSR2`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
  process.on(`SIGBREAK`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    logger.warn(`${signal}`);
  });
}

export { processOn };
