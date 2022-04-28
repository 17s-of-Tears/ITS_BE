import { Body, Controller, Post } from '@nestjs/common'

import { UsersService } from '@users/users.service'
import { UserRequestDto } from '@users/dtos/users.request.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('signup')
	async signup(@Body() body: UserRequestDto) {
		return await this.usersService.signUp(body)
	}
}
