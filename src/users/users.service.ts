import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UserRequestDto } from '@users/dtos/users.request.dto'
import { UserRepository } from '@users/user.repository'

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	//* 회원가입 service
	async signUp(body: UserRequestDto) {
		const { email, nickname, password } = body
		const isUserExist = await this.userRepository.existsByEmail(email)

		if (isUserExist)
			throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.')

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUserData = { email, nickname, password: hashedPassword }
		const newUser = await this.userRepository.createUsers(newUserData)

		return newUser.readOnlyData
	}
}
