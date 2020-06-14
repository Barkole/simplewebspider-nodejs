import { log } from "./logger";

// process.on(`beforeExit`, (code) => { // THis cause an endless loop
//   // eslint-disable-next-line no-console
//   console.warn(`Before exit`, code);
//   logger.warn(`Before exit`, code);
// });

function processOn(): void {
  process.on(`disconnect`, () => {
    // eslint-disable-next-line no-console
    console.warn(`Disconnect`);
    log.warn(`Disconnect`);
  });
  process.on(`exit`, (code) => {
    // eslint-disable-next-line no-console
    console.warn(`Exit ${code}`);
    log.warn(`Exit ${code}`);
  });
  process.on(`uncaughtException`, function (err) {
    // eslint-disable-next-line no-console
    console.warn(`Uncaught error`, err);
    log.warn(`Uncaught error`, err);
  });
  // process.on(`uncaughtExceptionMonitor`, function (err) { // What is the difference to uncaughtException?
  //   // eslint-disable-next-line no-console
  //   console.warn(`Uncaught monitor error`, err);
  //   logger.warn(`Uncaught monitor error`, err);
  // });
  process.on(`unhandledRejection`, (reason) => {
    // eslint-disable-next-line no-console
    console.warn(`Unhandled Rejection ${JSON.stringify(reason)}`);
    log.warn(`Unhandled Rejection ${JSON.stringify(reason)}`);
  });
  process.on(`warning`, (warning) => {
    // eslint-disable-next-line no-console
    console.warn(`Warning`, warning);
    log.warn(`Warning`, warning);
  });
  process.on(`message`, (message) => {
    // eslint-disable-next-line no-console
    console.warn(`Message ${JSON.stringify(message)}`);
    log.warn(`Message ${JSON.stringify(message)}`);
  });
  process.on(`SIGABRT`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
  process.on(`SIGHUP`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
  process.on(`SIGINT`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
  process.on(`SIGKILL`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
  process.on(`SIGQUIT`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
  process.on(`SIGSTOP`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
  process.on(`SIGUSR1`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
  process.on(`SIGUSR2`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
  process.on(`SIGBREAK`, (signal) => {
    // eslint-disable-next-line no-console
    console.warn(`${signal}`);
    log.warn(`${signal}`);
  });
}

export { processOn };
