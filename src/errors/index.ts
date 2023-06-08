import { AplicationError } from "protocols";

function notFoundError(): AplicationError {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

function unauthorizedError(): AplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function conflictError(message: string): AplicationError {
  return {
    name: "ConflictError",
    message,
  };
}

function invalidCredentilsError() {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

export default {
  notFoundError,
  unauthorizedError,
  conflictError,
  invalidCredentilsError,
};
