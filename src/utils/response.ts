export class ResponseObj {
  constructor(public status: number, public message: string, public body: any) {
    this.status = status;
    this.body = body;
  }

  static success(message: string, body: any) {
    return new ResponseObj(200, message, body);
  }

  static created(message: string, body: any) {
    return new ResponseObj(201, message, body);
  }

  static badRequest(message: string, body: any) {
    return new ResponseObj(400, message, body);
  }

  static unauthorized(message: string, body: any) {
    return new ResponseObj(401, message, body);
  }

  static forbidden(message: string, body: any) {
    return new ResponseObj(403, message, body);
  }

  static notFound(message: string, body: any) {
    return new ResponseObj(404, message, body);
  }

  static conflict(message: string, body: any) {
    return new ResponseObj(409, message, body);
  }

  static internalServerError(message: string, body: any) {
    return new ResponseObj(500, message, body);
  }
}
