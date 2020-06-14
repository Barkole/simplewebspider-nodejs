import Errlop from "errlop";

export class InvalidConfigurationError extends Errlop {
  e: Error | undefined;
  constructor(message: string, e?: Error) {
    super(message, e);
    this.name = `InvalidConfigurationError`;
  }
}
