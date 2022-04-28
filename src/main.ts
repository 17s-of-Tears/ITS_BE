import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '@src/app.module'

async function bootstrap() {
	const { PORT } = process.env
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe()) //* class validation

	await app.listen(PORT)
}
bootstrap()
