import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	UseGuards
} from '@nestjs/common'

import { JwtAuthGuard } from '@src/users/jwt/jwt.guard'
import { CommentsCreateDto } from '@comments/dto/comments.create.dto'
import { CommentsService } from '@comments/comments.service'
import { CurrentUser } from '@common/decorators/user.decorator'
import { User } from '@users/users.schema'

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post(':postId')
	async createComment(
		@Param('postId') id: string,
		@Body() body: CommentsCreateDto
	) {
		return this.commentsService.createComment(id, body)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':commentId')
	async deleteComment(
		@CurrentUser() user: User,
		@Param('commentId') id: string
	) {
		return this.commentsService.deleteComment(user, id)
	}
}
