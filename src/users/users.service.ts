import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UserRequestDto } from '@users/dtos/users.request.dto'
import { UsersRepository } from '@users/users.repository'
import { User } from './users.schema'

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	//* 회원가입 service
	async signUp(body: UserRequestDto) {
		const { email, nickname, password } = body
		const isUserExist = await this.usersRepository.existsByEmail(email)

		if (isUserExist)
			throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.')

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUserData = { email, nickname, password: hashedPassword }
		const newUser = await this.usersRepository.createUsers(newUserData)

		return newUser.readOnlyData
	}

	//* 프로필 이미지 변경 service
	async uploadImg(user: User, file: Express.Multer.File) {
		const fileName = `users/${file.filename}`
		const newUser = await this.usersRepository.findByIdAndUpdateImg(
			user.id,
			fileName
		)
		return newUser
	}

	//* 모든 유저 조회 service
	async getAllUser() {
		const allUser = await this.usersRepository.findAll()
		const readOnlyUsers = allUser.map(user => user.readOnlyData)
		return readOnlyUsers
	}
}
