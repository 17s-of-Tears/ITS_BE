import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CommentsCreateDto } from '@comments/dto/comments.create.dto'
import { Comment } from '@comments/comments.schema'
import { Team } from '@teams/teams.schema'
import { User } from '@users/users.schema'

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
		@InjectModel(Team.name) private readonly teamModel: Model<Team>,
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	//* 댓글 작성 service
	async createComment(id: string, comments: CommentsCreateDto) {
		try {
			const targetPost = await this.teamModel.findById(id)

			const { author, content } = comments
			const validtedAuthor = await this.userModel
				.findById(author)
				.select('-password')
			const newComment = new this.commentModel({
				author: validtedAuthor._id,
				content,
				info: targetPost._id
			})
			const readOnlyComment = await newComment.save()

			return readOnlyComment.readOnlyData
		} catch (error) {
			throw new BadRequestException(error.message)
		}
	}

	//* 댓글 삭제 service
	async deleteComment(user: User, id: string) {
		const comment = await this.commentModel.findById(id)
		if (!comment) throw new HttpException('해당 댓글이 없습니다.', 400)
		if (comment.author.toString() === user.id) {
			await comment.deleteOne()
			return { id: comment.id }
		} else throw new HttpException('다른유저의 댓글은 삭제할 수 없습니다.', 403)
	}
}
