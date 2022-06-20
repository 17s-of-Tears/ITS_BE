import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CommentsController } from '@comments/comments.controller'
import { Comment, CommentSchema } from '@comments/comments.schema'
import { CommentsService } from '@comments/comments.service'
import { TeamsModule } from '@teams/teams.module'
import { Team, TeamSchema } from '@teams/teams.schema'
import { UsersModule } from '@users/users.module'
import { User, UserSchema } from '@users/users.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Comment.name, schema: CommentSchema },
			{ name: Team.name, schema: TeamSchema },
			{ name: User.name, schema: UserSchema }
		]),
		TeamsModule,
		UsersModule
	],
	controllers: [CommentsController],
	providers: [CommentsService],
	exports: []
})
export class CommentsModule {}
