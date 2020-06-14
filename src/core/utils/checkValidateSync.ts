import { validateSync } from "class-validator";
import { ValidationCheckError } from "./ValidationCheckError";

// eslint-disable-next-line @typescript-eslint/ban-types
export function checkValidateSync(o: Object): void {
  const errors = validateSync(o);
  // TODO Is there a shortcut
  if (errors && errors.length > 0) {
    throw new ValidationCheckError(`Validation failed`, errors);
  }
}
