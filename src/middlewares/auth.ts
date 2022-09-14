import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const config: NodeJS.ProcessEnv = process.env

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(
      token.replace(/(Bearer)/g, '').trim(),
      config.TOKEN_KEY as string
    )
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}
