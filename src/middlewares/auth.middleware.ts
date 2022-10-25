import { Injectable, NestMiddleware, HttpException, HttpStatus } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { jwtConfig }  from "../configs/jwt.config"

interface AccessTokenPayload {
    _id: string
    login: string
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const headers = req.headers
        const bearer = headers["authorization"]
        
        if(bearer) {
            if(/Bearer ([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/.test(bearer)) {
                const token = bearer.match(/([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/g)[0]
                
                return jwt.verify(token, jwtConfig.secret, (error, payload: AccessTokenPayload) => {
                    if(!error) { req.user = payload; next() }
                    else throw new HttpException("Access token is invalid", HttpStatus.UNAUTHORIZED)
                })
            }
            else throw new HttpException("Authorization header format is invalid", HttpStatus.BAD_REQUEST)
        }
        else throw new HttpException("Authorization header not found", HttpStatus.NOT_FOUND)
    }
}