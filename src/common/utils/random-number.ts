export const randomNumber = (min: number, max: number) =>
	parseInt((Math.random() * (max - min) + min).toString(), 10)
