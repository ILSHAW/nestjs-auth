import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
	public catch (exception: BadRequestException, host: ArgumentsHost) {
		const res = host.switchToHttp().getResponse<Response>()
		const status = exception.getStatus()
		const message = exception.getResponse()["message"][0]

		res.status(status).send({ status, message })
	}
}