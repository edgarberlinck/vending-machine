export interface RequestBody<T> extends Express.Request {
  body: T
}

export interface AuthenticatedRequest extends Request {
  user?: User | string
}

export interface AuthenticatedRequestWithBody
  extends RequestBody,
    AuthenticatedRequest {}
