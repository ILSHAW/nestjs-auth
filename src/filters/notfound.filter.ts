import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from "@nestjs/common"
import { Response } from "express"

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter<NotFoundException> {
	catch(exception: NotFoundException, host: ArgumentsHost) {
		return host.switchToHttp().getResponse<Response>().status(exception.getStatus()).send({ status: exception.getStatus(), message: "Route not found" })
	}
}