import { Role } from '../../enums/Role'

export type UserRegistrationBody = {
  username: string
  password: string
  passwordRepeat: string
  role: Role
}
