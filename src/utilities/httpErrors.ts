export abstract class HTTPClientError extends Error {
  readonly statusCode!: number
  readonly name!: string

  constructor(message: unknown | string) {
    if (typeof message === "string") {
      super(message)
    } else {
      super(JSON.stringify(message))
    }
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400

  constructor(message = "Bad Request") {
    super(message)
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401

  constructor(message = "Unauthorized") {
    super(message)
  }
}

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403

  constructor(message = "Forbidden") {
    super(message)
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404

  constructor(message = "Not found") {
    super(message)
  }
}
