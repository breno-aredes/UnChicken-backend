import { ApplicationError } from "protocols";

function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

function unauthorizedError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function conflictError(message: string): ApplicationError {
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

function forBiddenError(): ApplicationError {
  return {
    name: "ForBiddenError",
    message: "Forbidden Error!",
  };
}

function validationError(message: string): ApplicationError {
  return {
    name: "ValidationError",
    message,
  };
}

export default {
  notFoundError,
  unauthorizedError,
  conflictError,
  invalidCredentilsError,
  forBiddenError,
  validationError,
};
