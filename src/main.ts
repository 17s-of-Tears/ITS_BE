import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as path from 'path'

import { AppModule } from '@src/app.module'

async function bootstrap() {
	const { PORT, ORIGIN } = process.env
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	})

	// app.enableCors({ origin: true }) //* cors 설정
	app.useGlobalPipes(new ValidationPipe()) //* class validation 설정
	app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
		prefix: '/media'
	}) //* static file 서빙

	await app.listen(PORT || 3000)
}
bootstrap()
