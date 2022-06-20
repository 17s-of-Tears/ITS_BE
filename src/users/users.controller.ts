import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { CurrentUser } from '@common/decorators/user.decorator'
import { multerOptions } from '@common/utils/multer.options'
import { LoginRequestDto } from '@users/dto/login.request.dto'
import {
	UserChangeNicknameDto,
	UserRequestDto
} from '@users/dto/users.request.dto'
import { JwtAuthGuard } from '@users/jwt/jwt.guard'
import { User } from '@users/users.schema'
import { UsersService } from '@users/users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	//* 현재 회원 정보 조회 api
	@UseGuards(JwtAuthGuard)
	@Get('me')
	getCurrentUser(@CurrentUser() user: User) {
		return user ? user.readOnlyData : null
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
		return await this.usersService.jwtLogIn(body)
	}

	//* 유저 닉네임 변경 api
	@UseGuards(JwtAuthGuard)
	@Post('nickname')
	async changeNickname(
		@CurrentUser() user: User,
		@Body() body: UserChangeNicknameDto
	) {
		return await this.usersService.changeNickname(user, body)
	}

	//* 유저 프로필 사진 변경 api
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('image', multerOptions('users')))
	@Post('image')
	async uploadUserImg(
		@CurrentUser() user: User,
		@UploadedFile() file: Express.Multer.File
	) {
		return await this.usersService.uploadImg(user, file)
	}

	//* 유저 프로필 사진 삭제 api
	@UseGuards(JwtAuthGuard)
	@Delete('image')
	async deleteUserImg(@CurrentUser() user: User) {
		return await this.usersService.deleteImg(user)
	}

	//* 유저 회원탈퇴 api
	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	deleteUser(@CurrentUser() user: User, @Param('id') targetId: string) {
		return this.usersService.deleteUser(user, targetId)
	}
}
