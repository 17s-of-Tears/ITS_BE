import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserRequestDto } from '@users/dtos/users.request.dto'
import { User } from '@users/users.schema'

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	//* 유저 존재여부 검사
	async existsByEmail(email: string): Promise<boolean> {
		const result = await this.userModel.exists({ email })
		return !!result
	}

	//* 유저 생성
	async createUsers(data: UserRequestDto) {
		return await this.userModel.create(data)
	}
}
