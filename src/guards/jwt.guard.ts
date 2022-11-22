import { ExecutionContext, Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { IsNotEmpty, validateOrReject, ValidationError, IsString, Matches } from "class-validator"
import { Request } from "express"
import { config } from "../configs/jwt.config"

export class AccessDTO {
    @Matches(/^Bearer ([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)$/, { message: "Authorization header format is invalid" })
    @IsString({ message: "Authorization header must be a string" })
    @IsNotEmpty({ message: "Authorization header is requried" })
    authorization: string

    constructor(data: any) {
        this.authorization = data.authorization
    }
}
export class RefreshDTO {
    @Matches(/^Bearer ([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)$/, { message: "Refresh cookie format is invalid" })
    @IsString({ message: "Refresh cookie must be a string" })
    @IsNotEmpty({ message: "Refresh cookie is requried" })
    cookie: string

    constructor(data: any) {
        this.cookie = data.cookie
    }
}

@Injectable()
export class AccessGuard extends AuthGuard("jwt-access") {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            await validateOrReject(new AccessDTO(context.switchToHttp().getRequest<Request>().headers))
            return super.canActivate(context) as boolean
        } 
        catch(e: any) {
            throw new HttpException(e.map((error: ValidationError) => Object.keys(error.constraints).map((key) => error.constraints[key])).flat(1)[0], HttpStatus.BAD_REQUEST)
        }
    }
    handleRequest<TUser = any>(error: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if(error) { throw error }
        else if(info) { throw new HttpException("Access token is invalid", HttpStatus.BAD_REQUEST) }
        else return user
    }
}

@Injectable()
export class RefreshGuard extends AuthGuard("jwt-refresh") {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            await validateOrReject(new RefreshDTO({ cookie: context.switchToHttp().getRequest<Request>().cookies[config.cookie.name] }))
            return super.canActivate(context) as boolean
        } 
        catch(e: any) {
            throw new HttpException(e.map((error: ValidationError) => Object.keys(error.constraints).map((key) => error.constraints[key])).flat(1)[0], HttpStatus.BAD_REQUEST)
        }
    }
    handleRequest<TUser = any>(error: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if(error) { throw error }
        else if(info) { throw new HttpException("Refresh token is invalid", HttpStatus.BAD_REQUEST) }
        else return user
    }
}