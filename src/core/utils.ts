import { validateSync, ValidationError } from "class-validator";

class ValidationCheckError extends Error {
  errors: ValidationError[] | undefined;

  constructor(message?: string, errors?: ValidationError[]) {
    super(message);
    this.name = `ValidationError`;
    this.errors = errors;
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
