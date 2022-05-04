import {
	Body,
	Controller,
	Get,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { LoginRequestDto } from '@auth/dtos/login.request.dto'
import { JwtAuthGuard } from '@auth/jwt/jwt.guard'
import { AuthService } from '@auth/auth.service'
import { CurrentUser } from '@common/decorators/user.decorator'
import { multerOptions } from '@common/utils/multer.options'
import { UserRequestDto } from '@users/dtos/users.request.dto'
import { User } from '@users/users.schema'
import { UsersService } from '@users/users.service'

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService
	) {}

	//* 현재 회원 정보 조회 api
	@UseGuards(JwtAuthGuard)
	@Get('me')
	getCurrentUser(@CurrentUser() user: User) {
		return user.readOnlyData
	}

	//* 모든 회원 정보 조회 api
	@Get('all')
	getAllUser() {
		return this.usersService.getAllUser()
	}

	//* 회원가입 api
	@Post('signup')
	async signup(@Body() body: UserRequestDto) {
		return await this.usersService.signUp(body)
	}

	//* 로그인 api
	@Post('login')
	async login(@Body() body: LoginRequestDto) {
		return await this.authService.jwtLogIn(body)
	}

	//* 유저 프로필 사진 변경 api
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('image', multerOptions('users')))
	@Post('upload')
	async uploadUserImg(
		@CurrentUser() user: User,
		@UploadedFile() file: Express.Multer.File
	) {
		return await this.usersService.uploadImg(user, file)
	}
}
