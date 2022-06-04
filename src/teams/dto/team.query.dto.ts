import { TeamSkillType } from '@typings/team'

export class TeamQueryDto {
	//* 페이지네이션
	limit: string
	skip: string

	//* 필터
	goal: 'project' | 'study'
	skill: TeamSkillType

	//* 정렬
	key: 'createAt' | 'hits' | 'likeList'

	//* 검색
	teamName: string
}
