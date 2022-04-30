import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '@src/app.module'

async function bootstrap() {
	const { PORT, ORIGIN } = process.env
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe()) //* class validation
	app.enableCors({ origin: ORIGIN, credentials: true }) //* cors setting

	await app.listen(PORT)
}
bootstrap()
