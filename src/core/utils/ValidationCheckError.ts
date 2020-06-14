import { ValidationError } from "class-validator";
import Errlop from "errlop";
export class ValidationCheckError extends Errlop {
  errors: string[] | undefined;

  constructor(message: string, errors?: ValidationError[]) {
    super(message);
    this.name = `ValidationError`;
    this.errors =
      errors &&
      errors.map((entry) => {
        const property = JSON.stringify(entry.property);
        const constraints = JSON.stringify(entry.constraints);
        return `{"property": ${property}, "contraints": ${constraints}}`;
      });
  }
}
