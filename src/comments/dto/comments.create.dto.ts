import { PickType } from '@nestjs/mapped-types'
import { Comment } from '@comments/comments.schema'

export class CommentsCreateDto extends PickType(Comment, [
	'author',
	'content'
] as const) {}
