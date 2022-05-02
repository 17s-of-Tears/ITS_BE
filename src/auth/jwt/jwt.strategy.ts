import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { IPayload } from '@typings/user'
import { UsersRepository } from '@users/users.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersRepository: UsersRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
			ignoreExpiration: false
		})
	}

	//* jwt 인증 부분, 인증 성공 시 유저 정보 리턴
	async validate(payload: IPayload) {
		const user = await this.usersRepository.findUserByIdWithoutPassword(
			payload.sub
		)

		if (user) return user
		else throw new UnauthorizedException()
	}
}
