import { PickType } from '@nestjs/mapped-types'
import { User } from '@users/users.schema'

export class LoginRequestDto extends PickType(User, [
	'email',
	'password'
] as const) {}
