import Errlop from "errlop";

export class UnknownLogLevelError extends Errlop {
  logLevel: string | undefined;

  constructor(message: string, logLevel?: string) {
    super(message);
    this.name = `UnknownLogLevelError`;
    this.logLevel = logLevel;
  }
}
