export class EnvFileMissingError extends Error {
  filename: string | undefined;

  constructor(message?: string, filename?: string) {
    super(message);
    this.name = `EnvFileMissingError`;
    this.filename = filename;
  }
}
