import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Document, SchemaOptions } from 'mongoose'

import { IUser } from '@typings/user'

const options: SchemaOptions = { timestamps: true }

@Schema(options)
export class User extends Document {
	@IsEmail()
	@IsNotEmpty()
	@Prop({ required: true, unique: true })
	email: string

	@IsString()
	@IsNotEmpty()
	@Prop({ required: true, unique: true })
	nickname: string

	@IsString()
	@IsNotEmpty()
	@Prop({ required: true })
	password: string

	@Prop()
	imgUrl: string

	readonly readOnlyData: IUser
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('readOnlyData').get(function (this: User) {
	return {
		id: this.id,
		email: this.email,
		nickname: this.nickname
	}
})
