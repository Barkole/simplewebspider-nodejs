export class InvalidConfigurationError extends Error {
  e: Error | undefined;
  constructor(message?: string, e?: Error) {
    super(message);
    this.name = `InvalidConfigurationError`;
    this.e = e;
  }
}
