/* eslint-disable array-callback-return */
import {ValidationError} from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.map((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
