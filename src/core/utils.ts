import { validateSync, ValidationError } from "class-validator";

class ValidationCheckError extends Error {
  errors: string[] | undefined;

  constructor(message?: string, errors?: ValidationError[]) {
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

// eslint-disable-next-line @typescript-eslint/ban-types
function checkValidateSync(o: Object): void {
  const errors = validateSync(o);
  // TODO Is there a shortcut
  if (errors && errors.length > 0) {
    throw new ValidationCheckError(`Validation failed`, errors);
  }
}

export { checkValidateSync, ValidationError };
