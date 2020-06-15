import Errlop from "errlop";

export class BootstrapError extends Errlop {
  filename: string | undefined;

  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
