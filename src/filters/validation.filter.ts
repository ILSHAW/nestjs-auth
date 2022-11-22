import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from "@nestjs/common"
import { Response } from "express"

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
	catch (exception: BadRequestException, host: ArgumentsHost) {
        console.log(exception.getResponse())
		return host.switchToHttp().getResponse<Response>().status(exception.getStatus()).send({ status: exception.getStatus(), message: exception.getResponse()["message"][0] })
	}
}