import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from "jsonwebtoken"
import { jwtConfig } from "../configs/jwt.config"

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
        const bearer = context.switchToHttp().getRequest().headers["authorization"]

        if(bearer) {
            if(/Bearer ([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/.test(bearer)) {
                const token = bearer.match(/([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/g)[0]

                try {
                    return jwt.verify(token, jwtConfig.secret) && true
                }
                catch(e: any) {
                    throw new HttpException("Access token is invalid", HttpStatus.FORBIDDEN)
                }
            }
            else throw new HttpException("Authorization header format is invalid", HttpStatus.BAD_REQUEST)
        }
        else throw new HttpException("Authorization header not found", HttpStatus.NOT_FOUND)
    }
}
