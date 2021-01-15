const players = [
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
	'content',
]

export type TAlbumItem = {
	player: any
	year: number,
	startTime?: number,
	endTime?: number
}

export const items = Array.from({ length: 200 }).map((_, index) => ({
	year: index + 1,
	player: players[index % players.length],
	startTime: 0,
	endTime:0
}))