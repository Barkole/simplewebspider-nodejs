import Errlop from "errlop";

export class EnvFileMissingError extends Errlop {
  filename: string | undefined;

  constructor(message: string, filename?: string) {
    super(message);
    this.name = `EnvFileMissingError`;
    this.filename = filename;
  }
}
