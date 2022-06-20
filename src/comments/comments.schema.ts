import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, IsPositive, IsString } from 'class-validator'
import * as dayjs from 'dayjs'
import { Document, Types } from 'mongoose'

@Schema()
export class Comment extends Document {
	@Prop({ type: Types.ObjectId, required: true, ref: 'users' })
	@IsNotEmpty()
	author: Types.ObjectId

	@Prop({ type: Types.ObjectId, required: true, ref: 'posts' })
	@IsNotEmpty()
	info: Types.ObjectId

	@Prop({ required: true })
	@IsNotEmpty()
	@IsString()
	content: string

	@Prop({ default: [] })
	@IsPositive()
	likeList: Array<string>

	@Prop({ default: [] })
	@IsPositive()
	unlikeList: Array<string>

	@Prop({ default: dayjs().format('YYYY-MM-DD') })
	createDate: string

	readonly readOnlyData: {
		id: string
		author: string
		content: string
		likeList: Array<string>
		unlikeList: Array<string>
		createDate: string
	}
}

export const CommentSchema = SchemaFactory.createForClass(Comment)

CommentSchema.virtual('readOnlyData').get(function (this: Comment) {
	return {
		id: this.id,
		author: this.author,
		content: this.content,
		likeList: this.likeList,
		unlikeList: this.unlikeList,
		createDate: this.createDate
	}
})
