import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Team } from '@teams/teams.schema'
import { TeamCreateDto } from './dto/team.create.dto'
import { TeamQueryDto } from './dto/team.query.dto'

@Injectable()
export class TeamsService {
	constructor(
		@InjectModel(Team.name) private readonly teamModel: Model<Team>
	) {}

	//* 모든 팀 조회 service
	async getAllTeams(payload: TeamQueryDto) {
		const { goal, limit, skill, skip, key, teamName } = payload
		const sortKey = key ? key : 'createAt'
		let teams: Team[]

		if (goal || skill) {
			//* 팀 종류 필터
			if (goal !== 'project' && goal !== 'study')
				throw new HttpException('올바른 값이 아닙니다.', 400)
			teams = await this.teamModel
				.find({ goal, skill })
				.sort({ [sortKey]: -1 })
				.limit(limit ? Number(limit) : 20)
				.skip(skip ? Number(skip) : 0)
		} else if (teamName) {
			//* 팀 검색
			teams = await this.teamModel
				.find({ teamName })
				.limit(limit ? Number(limit) : 20)
				.skip(skip ? Number(skip) : 0)
		} else {
			//* default
			teams = await this.teamModel
				.find()
				.sort({ [key]: -1 })
				.limit(limit ? Number(limit) : 20)
				.skip(skip ? Number(skip) : 0)
		}

		return teams.map(team => team.readOnlyData)
	}

	//* 특정 팀 조회 service
	async getOneTeam(id: string) {
		const team = await this.teamModel.findById(id)
		if (!team) throw new HttpException('팀이 존재하지 않습니다.', 400)
		team.hits += 1
		const newTeam = await team.save()
		return newTeam.readOnlyData
	}

	//* 팀 생성 service
	async create(author: string, payload: TeamCreateDto) {
		const newTeam = await this.teamModel.create({
			author,
			...payload
		})
		return newTeam.readOnlyData
	}
}
