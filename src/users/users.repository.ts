import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserRequestDto } from '@users/dtos/users.request.dto'
import { User } from '@users/users.schema'

@Injectable()
export class UsersRepository {
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

	//* 해당 유저찾기
	async findUserByEmail(email: string): Promise<User | null> {
		const user = await this.userModel.findOne({ email })
		return user
	}

	//* 해당 유저찾기, 비밀번호 제외
	async findUserByIdWithoutPassword(userId: string): Promise<User> {
		const user = await this.userModel.findById(userId).select('-password')
		return user
	}

	//*해당 유저 프로필 이미지 저장
	async findByIdAndUpdateImg(userId: string, fileName: string) {
		const user = await this.userModel.findById(userId)
		user.imgUrl = `${process.env.BASE_URI}/media/${fileName}`
		const newUser = await user.save()
		return newUser.readOnlyData
	}

	//* 모든 유저 찾기
	async findAll() {
		return await this.userModel.find()
	}
}
