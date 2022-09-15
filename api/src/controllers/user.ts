import { UserRegistrationBody } from '../routes/types'
import { Authentication } from '../types'
import jwt from 'jsonwebtoken'
import { create } from '../remote/users'

const config: NodeJS.ProcessEnv = process.env

export const register = async (
  user: UserRegistrationBody
): Promise<Authentication> => {
  await create({
    username: user.username,
    password: user.password,
    role: user.role,
  })

  const token = jwt.sign(
    { username: user.username, role: user.role },
    config.TOKEN_KEY as string,
    { expiresIn: '8h' }
  )

  return { token }
}
