import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { LoginRequestDto } from '@auth/dtos/Login.request.dto'
import { UsersRepository } from '@users/users.repository'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private jwtService: JwtService
	) {}

	async jwtLogIn(data: LoginRequestDto) {
		const { email, password } = data

		//* email 검사
		const user = await this.usersRepository.findUserByEmail(email)
		if (!user)
			throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.')

		//* password 검사
		const isPasswordValidated: boolean = await bcrypt.compare(
			password,
			user.password
		)
		if (!isPasswordValidated)
			throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.')

		//* token 발급
		const payload = { email, sub: user.id }
		return { token: this.jwtService.sign(payload) }
	}
}