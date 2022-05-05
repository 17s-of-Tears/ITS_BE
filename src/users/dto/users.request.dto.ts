import { PickType } from '@nestjs/mapped-types'
import { User } from '@users/users.schema'

export class UserRequestDto extends PickType(User, [
	'email',
	'nickname',
	'password'
] as const) {}
