import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserRepository } from '@users/user.repository'
import { UsersController } from '@users/users.controller'
import { User, UserSchema } from '@users/users.schema'
import { UsersService } from '@users/users.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
	],
	controllers: [UsersController],
	providers: [UsersService, UserRepository],
	exports: [UsersService]
})
export class UsersModule {}
