import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { JwtStrategy } from '@users/jwt/jwt.strategy'
import { UsersController } from '@users/users.controller'
import { User, UserSchema } from '@users/users.schema'
import { UsersService } from '@users/users.service'

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
		MulterModule.register({ dest: './upload' }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1y' }
		})
	],
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	exports: [UsersService]
})
export class UsersModule {}
