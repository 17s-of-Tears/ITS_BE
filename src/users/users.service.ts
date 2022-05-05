import {
	HttpException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'

import { UserRequestDto } from '@users/dtos/users.request.dto'
import { User } from '@users/users.schema'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	//* 모든 유저 조회 service
	async getAllUser() {
		const allUser = await this.userModel.find()
		const readOnlyUsers = allUser.map(user => user.readOnlyData)
		return readOnlyUsers
	}

	//* 회원가입 service
	async signUp(body: UserRequestDto) {
		const { email, nickname, password } = body
		const isUserExist = await Promise.all([
			this.userModel.findOne({ email }),
			this.userModel.findOne({ nickname })
		])
		const userValid = isUserExist.map(v => v !== null)
		const userValidNumber = userValid.indexOf(true)

		//* signup validation
		if (userValidNumber >= 0) {
			const exostError = (message: string) => {
				throw new UnauthorizedException(
					`해당하는 ${message}은 이미 존재합니다.`
				)
			}
			switch (userValidNumber) {
				case 0:
					exostError('이메일')
				case 1:
					exostError('닉네임')
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUserData = { email, nickname, password: hashedPassword }
		const newUser = await this.userModel.create(newUserData)

		return newUser.readOnlyData
	}

	//* 프로필 이미지 변경 service
	async uploadImg(user: User, file: Express.Multer.File) {
		if (!file) throw new HttpException('이미지정보가 없습니다.', 400)
		const currentUser = await this.userModel.findById(user.id)
		currentUser.imgUrl = `${process.env.BASE_URI}/media/users/${file.filename}`
		const newUser = await currentUser.save()
		return newUser.readOnlyData
	}
}
