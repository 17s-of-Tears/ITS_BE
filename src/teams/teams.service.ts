import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { model, Model } from 'mongoose'

import { CommentSchema } from '@comments/comments.schema'
import { Team } from '@teams/teams.schema'
import { TeamCreateDto } from './dto/team.create.dto'
// import { TeamQueryDto } from './dto/team.query.dto'

@Injectable()
export class TeamsService {
	constructor(
		@InjectModel(Team.name) private readonly teamModel: Model<Team>
	) {}

	//* 모든 팀 조회 service
	async getAllTeams() {
		const CommentsModel = model('comments', CommentSchema)
		const teams = await this.teamModel
			.find()
			.sort({ createdAt: -1 })
			.populate('comments', CommentsModel)
		// .limit(limit ? Number(limit) : 20)
		// .skip(skip ? Number(skip) : 0)

		return teams.map(team => team.readOnlyData)
	}

	//* 특정 팀 조회 service
	async getOneTeam(id: string) {
		const CommentsModel = model('comments', CommentSchema)
		const team = await this.teamModel
			.findById(id)
			.populate('comments', CommentsModel)
		if (!team) throw new HttpException('팀이 존재하지 않습니다.', 400)
		return team.readOnlyData
	}

	//* 총 팀 갯수 조회 service
	async getTotalTeam() {
		const teams = await this.teamModel.find()
		return teams.length
	}

	//* 팀 생성 service
	async create(author: string, payload: TeamCreateDto) {
		const newTeam = await this.teamModel.create({
			author,
			...payload
		})
		return newTeam.readOnlyData
	}

	//* 조회수 증가 service
	async incViewCount(teamId: string) {
		console.log(teamId)
		const team = await this.teamModel.findById(teamId)
		if (!team) throw new HttpException('팀이 존재하지 않습니다.', 400)
		team.hits += 1
		const newTeam = await team.save()

		return newTeam.hits
	}
}
