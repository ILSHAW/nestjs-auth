import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common"
import { Response } from "express"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
	catch(exception: HttpException, host: ArgumentsHost) {
		return host.switchToHttp().getResponse<Response>().status(exception.getStatus()).send({ status: exception.getStatus(), message: exception.getResponse() })
	}
}