import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    public catch (exception: HttpException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>()
        const status = exception.getStatus()
        const message = exception.getResponse()

        res.status(status).send({ status, message })
    }
}