type ErrorDetails = {
  code: string;
};
export class AuthenticationError extends Error {
  details?: ErrorDetails;
  constructor(message: string, details?: ErrorDetails) {
    super(message);
    this.details = details;
  }
}

export class PasswordError extends AuthenticationError {
  constructor(message: string) {
    super(message);
  }
}

export class UserNotFoundError extends AuthenticationError {
  constructor(message: string) {
    super(message);
  }
}

export class APIError extends AuthenticationError {
  details?: ErrorDetails;
  constructor(message: string, details?: ErrorDetails) {
    super(message);
    this.details = details;
  }
}
