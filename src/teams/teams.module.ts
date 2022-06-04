import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TeamsController } from '@teams/teams.controller'
import { Team, TeamSchema } from '@teams/teams.schema'
import { TeamsService } from '@teams/teams.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }])
	],
	controllers: [TeamsController],
	providers: [TeamsService]
})
export class TeamsModule {}
