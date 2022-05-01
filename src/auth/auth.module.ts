import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from '@auth/auth.service'
import { UsersModule } from '@users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: '1y' }
		}),
		forwardRef(() => UsersModule) //* 순환 참조 모듈
	],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule {}
