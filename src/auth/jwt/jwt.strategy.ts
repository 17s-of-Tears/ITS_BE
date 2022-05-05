import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from '@nestjs/mongoose'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Model } from 'mongoose'

import { IPayload } from '@typings/user'
import { User } from '@users/users.schema'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
			ignoreExpiration: false
		})
	}

	//* jwt 인증 부분, 인증 성공 시 유저 정보 리턴
	async validate(payload: IPayload) {
		const user = await this.userModel.findById(payload.sub).select('-password')

		if (user) return user
		else throw new UnauthorizedException()
	}
}
