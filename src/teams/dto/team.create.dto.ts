import { PickType } from '@nestjs/mapped-types'
import { Team } from '@teams/teams.schema'

export class TeamCreateDto extends PickType(Team, [
	'goal',
	'skills',
	'teamName',
	'teamDescription'
] as const) {}
