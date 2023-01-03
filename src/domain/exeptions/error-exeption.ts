export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  CONFLICT = 409,
  UNAUTHORIZED = 401,
}

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

class APIError extends BaseError {
  constructor(description: string = "Internal Server Error") {
    super("Server Error", HttpStatusCode.INTERNAL_SERVER, description, true);
  }
}

export class HTTP400Error extends BaseError {
  constructor(description: string = "Bad Request") {
    super("Bad Request", HttpStatusCode.BAD_REQUEST, description, true);
  }
}

class HTTP404Error extends BaseError {
  constructor(description: string = "Not Found") {
    super("Not Found", HttpStatusCode.NOT_FOUND, description, true);
  }
}
