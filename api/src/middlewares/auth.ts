import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Role } from '../enums/Role'

const config: NodeJS.ProcessEnv = process.env

export interface User extends JwtPayload {
  role: Role
  name: string
}

export interface AuthenticatedRequest extends Request {
  user?: User | string
}

export const authorize =
  (allowedRoles: Role[]) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token = req.headers['authorization']

    if (!token) {
      return res
        .status(403)
        .json({ message: 'A token is required for authentication' })
    }
    if (token.toLocaleLowerCase().startsWith('bearer')) {
      token = token.slice('bearer'.length).trim()
    }

    try {
      const decodedUser = jwt.verify(token, config.TOKEN_KEY as string) as User

      if (!allowedRoles.includes(decodedUser.role)) {
        return res.status(401).json({
          message: `A ${decodedUser.role} does't have access to this`,
        })
      }

      req.user = decodedUser
    } catch (err) {
      return res.status(401).json({ message: 'Invalid Token' })
    }
    return next()
  }
