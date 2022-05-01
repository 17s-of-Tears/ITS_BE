import { Body, Controller, Post } from '@nestjs/common'

import { UsersService } from '@users/users.service'
import { UserRequestDto } from '@users/dtos/users.request.dto'
import { AuthService } from '@auth/auth.service'
import { LoginRequestDto } from '@auth/dtos/Login.request.dto'

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService
	) {}

	@Post('signup')
	async signup(@Body() body: UserRequestDto) {
		return await this.usersService.signUp(body)
	}

	@Post('login')
	async login(@Body() body: LoginRequestDto) {
		return await this.authService.jwtLogIn(body)
	}
}
