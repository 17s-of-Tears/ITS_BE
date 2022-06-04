export type TeamGoalType = '팀 프로젝트' | '스터디'

export type TeamSkillType =
	| 'android'
	| 'angular'
	| 'aws'
	| 'c++'
	| 'css'
	| 'django'
	| 'docker'
	| 'flutter'
	| 'go'
	| 'html'
	| 'javascript'
	| 'kubernetes'
	| 'laravel'
	| 'linux'
	| 'nodejs'
	| 'php'
	| 'python'
	| 'ruby'
	| 'sass'
	| 'spring'
	| 'svelte'
	| 'swift'
	| 'typescript'
	| 'ubuntu'

export interface ITeam {
	id: string
	author: string
	goal: string
	skills: string
	teamName: string
	teamDescription: string
	hits: number
}
