import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from "jsonwebtoken"
import { jwtConfig } from "../configs/jwt.config"

@Injectable()
export class TokenRefreshGuard implements CanActivate {
    canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
        const token = context.switchToHttp().getRequest().cookies[jwtConfig.cookieName]

        if(token) {
            if(/([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/.test(token)) {
                try {
                    return jwt.verify(token, jwtConfig.secret) && true
                }
                catch(e: any) {
                    throw new HttpException("Refresh token is invalid", HttpStatus.FORBIDDEN)
                }
            }
            else throw new HttpException("Refresh token format is invalid", HttpStatus.BAD_REQUEST)
        }
        else throw new HttpException("Refresh cookie not found", HttpStatus.NOT_FOUND)
    }
}