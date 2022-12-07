import { AnySchema, ValidationError } from "yup";

export interface PPValidationError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const validateField = async <T>(
  data: T,
  schema: AnySchema
): Promise<PPValidationError> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return {};
  } catch (err) {
    const $error: ValidationError = err as ValidationError;
    const errors = $error.inner.reduce((acc, error) => {
      return {
        ...acc,
        [error.path as string]: error.message,
      };
    }, {});

    return errors;
  }
};

export const getObjectKeys = <T>(data: T): string[] => Object.keys(data as any);

export const validateForm = async <T>(
  data: T,
  schema: AnySchema
): Promise<PPValidationError> => {
  const errors: PPValidationError = await validateField(data, schema);
  return errors;
};
