import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as cookies from "cookie-parser"
import helmet from "helmet"

import { ValidationExceptionFilter } from "./filters/validation.filter"
import { NotFoundExceptionFilter } from "./filters/notfound.filter"
import { HttpExceptionFilter } from "./filters/http.filter"
import { database } from "./database/app.database"
import { AppModule } from "./modules/app.module"
import { config } from "./configs/app.config"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(helmet(), cookies())
	app.enableCors({ origin: "https://ilshaw.com", credentials: true })
	app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new HttpExceptionFilter())
	app.useGlobalFilters(new NotFoundExceptionFilter())
    app.useGlobalFilters(new ValidationExceptionFilter())

	await database.connect()
	await app.listen(config.port, () => console.log("Server is running on port", config.port))
}
bootstrap()
