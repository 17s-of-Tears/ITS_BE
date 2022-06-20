import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import * as dayjs from 'dayjs'
import { Document, SchemaOptions, Types } from 'mongoose'

import { ITeam, TeamGoalType, TeamSkillType } from '@typings/team'

const options: SchemaOptions = { timestamps: true }

@Schema(options)
export class Team extends Document {
	@Prop({ type: Types.ObjectId, required: true, ref: 'users' })
	@IsNotEmpty()
	author: Types.ObjectId

	@IsString()
	@IsNotEmpty()
	@Prop({ required: true })
	goal: TeamGoalType

	@IsArray()
	@IsNotEmpty()
	@Prop({ required: true })
	skills: Array<TeamSkillType>

	@IsString()
	@IsNotEmpty()
	@Prop({ required: true })
	teamName: string

	@IsString()
	@Prop()
	teamDescription: string

	@Prop({ default: 0 })
	hits: number

	@Prop({ default: dayjs().format('YYYY년 MM월 DD일') })
	createDate: string

	readonly readOnlyData: ITeam
}

export const TeamSchema = SchemaFactory.createForClass(Team)

TeamSchema.virtual('readOnlyData').get(function (this: Team) {
	return {
		id: this.id,
		author: this.author,
		goal: this.goal,
		skills: this.skills,
		teamName: this.teamName,
		teamDescription: this.teamDescription,
		hits: this.hits,
		createDate: this.createDate
	}
})
