export class UnknownLogLevelError extends Error {
  logLevel: string | undefined;

  constructor(message?: string, logLevel?: string) {
    super(message);
    this.name = `UnknownLogLevelError`;
    this.logLevel = logLevel;
  }
}
