import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import * as cookies from "cookie-parser"
import * as cors from "cors"
import helmet from "helmet"
import { AppModule } from "./modules/app.module"
import { appConfig } from "./configs/app.config.ts"
import { databaseConnect } from "./database/app.database"
import { HttpExceptionFilter } from "./filters/http.filter"
import { ValidationExceptionFilter } from "./filters/validation.filter"

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: { origin: "*", credentials: true } })

	app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))
	app.useGlobalFilters(new HttpExceptionFilter())
	app.useGlobalFilters(new ValidationExceptionFilter())
	app.enableCors({ origin: "*", credentials: true })
	app.use(cookies(), cors({ origin: "*", credentials: true }), helmet())

	await databaseConnect()
	await app.listen(appConfig.port, () => console.log("Server is running on port", appConfig.port))
}

bootstrap()
