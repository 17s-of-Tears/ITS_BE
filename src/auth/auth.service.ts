import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'

import { LoginRequestDto } from '@auth/dto/login.request.dto'
import { IPayload } from '@typings/user'
import { User } from '@users/users.schema'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private jwtService: JwtService
	) {}

	async jwtLogIn(data: LoginRequestDto) {
		const { email, password } = data

		//* email 검사
		const user = await this.userModel.findOne({ email })
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
		const payload: IPayload = { email, sub: user.id }
		return { token: this.jwtService.sign(payload) }
	}
}
