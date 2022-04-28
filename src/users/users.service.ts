import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { User } from '@users/users.schema'
import { UserRequestDto } from '@users/dtos/users.request.dto'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async signUp(body: UserRequestDto) {
		const { email, nickname, password } = body
		const isUserExist = await this.userModel.exists({ email })

		if (isUserExist) {
			throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.')
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = await this.userModel.create({
			email,
			nickname,
			password: hashedPassword
		})

		return newUser.readOnlyData
	}
}
