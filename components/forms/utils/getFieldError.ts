interface FieldLike {
  state: {
    meta: {
      errors: unknown[];
    };
  };
}

/**
 * Extracts a display-ready error string from a TanStack Form field.
 *
 * With `validators: { onChange: schema.shape.field }` (a raw Zod / Standard
 * Schema validator), `@tanstack/form-core`'s default field-level transformer
 * joins the Standard Schema issue messages into a single string before
 * storing it in `field.state.meta.errorMap`, so `field.state.meta.errors`
 * ends up as an array of plain strings (e.g. `["Correo electronico invalido"]`).
 *
 * This helper stays defensive and also unwraps `{ message: string }` shaped
 * entries in case a validator ever returns raw Standard Schema issues
 * instead of pre-joined strings.
 */
export function getFieldError(field: FieldLike): string | undefined {
  const [firstError] = field.state.meta.errors;

  if (!firstError) return undefined;

  if (typeof firstError === "string") return firstError;

  if (
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError &&
    typeof (firstError as { message: unknown }).message === "string"
  ) {
    return (firstError as { message: string }).message;
  }

  return undefined;
}
