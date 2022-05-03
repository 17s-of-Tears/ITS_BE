import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as path from 'path'

import { AppModule } from '@src/app.module'

async function bootstrap() {
	const { PORT, ORIGIN } = process.env
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalPipes(new ValidationPipe()) //* class validation 설정
	app.enableCors({ origin: ORIGIN, credentials: true }) //* cors 설정
	app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
		prefix: '/media'
	}) //* static file 서빙

	await app.listen(PORT)
}
bootstrap()
