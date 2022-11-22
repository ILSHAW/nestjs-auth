import { ExecutionContext, Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"
import { validateOrReject, ValidationError } from "class-validator"
import { SignupDTO } from "../services/auth.service"

@Injectable()
export class SignupGuard extends AuthGuard("signup") {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            await validateOrReject(new SignupDTO(context.switchToHttp().getRequest<Request>().body))
            return super.canActivate(context) as boolean
        } 
        catch(e: any) {
            throw new HttpException(e.map((error: ValidationError) => Object.keys(error.constraints).map((key) => error.constraints[key])).flat(1)[0], HttpStatus.BAD_REQUEST)
        }
    }
    handleRequest<TUser = any>(error: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if(error) { throw error }
        else return user
    }
}