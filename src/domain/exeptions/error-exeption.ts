export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER = 500,
  CONFLICT = 409,
  UNAUTHORIZED = 401,
}

/*
  400 - Bad Request
  400 - 0 - Bad Request
  400 - 1 - Bad Request - Invalid email
  400 - 2 - Bad Request - Invalid password
  400 - 3 - Bad Request - Invalid input
  400 - 4 - Bad Request - Email is already taken


  403 - Forbidden
  403 - 0 - Forbidden
  403 - 1 - Forbidden - User is not logged in
  403 - 2 - Forbidden - User is not authorized to access the resource
  403 - 3 - Forbidden - wrong password

  404 - Not Found
  404 - 0 - Not Found
  404 - 1 - Not Found - User not found
  404 - 2 - Not Found - Resource not found

  409 - Conflict
  409 - 0 - Conflict
  409 - 1 - Conflict - User already exists
  409 - 2 - Conflict - Resource already exists

  500 - Internal Server Error
  500 - 0 - Internal Server Error
  500 - 1 - Internal Server Error - Something went wrong

*/

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: number,
    description: string,
    isOperational: boolean
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(description: string = "Internal Server Error") {
    super("Server Error", HttpStatusCode.INTERNAL_SERVER, description, true);
  }
}

export class HTTP400Error extends BaseError {
  constructor(description: string = "Bad Request") {
    super("Bad Request", HttpStatusCode.BAD_REQUEST, description, true);
  }
}

export class HTTP404Error extends BaseError {
  constructor(description: string = "Not Found") {
    super("Not Found", HttpStatusCode.NOT_FOUND, description, true);
  }
}

export class HTTP409Error extends BaseError {
  constructor(description: string = "Conflict") {
    super("Conflict", HttpStatusCode.CONFLICT, description, true);
  }
}

export class HTTP401Error extends BaseError {
  constructor(description: string = "Unauthorized") {
    super("Unauthorized", HttpStatusCode.UNAUTHORIZED, description, true);
  }
}

export class HTTP500Error extends BaseError {
  constructor(description: string = "Internal Server Error") {
    super("Server Error", HttpStatusCode.INTERNAL_SERVER, description, true);
  }
}

export class HTTP403Error extends BaseError {
  constructor(description: string = "Forbidden") {
    super("Forbidden", HttpStatusCode.FORBIDDEN, description, true);
  }
}

export class HTTP498Error extends BaseError {
  constructor(description: string = "Token Expired") {
    super("Token Expired", 498, description, true);
  }
}
