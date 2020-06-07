import { validateSync } from "class-validator";

// eslint-disable-next-line @typescript-eslint/ban-types
function checkValidateSync(o: Object): void {
  const errors = validateSync(o);
  // TODO Is there a shortcut
  if (errors && errors.length > 0) {
    throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
  }
}

export { checkValidateSync };
