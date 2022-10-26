import { Injectable, NestMiddleware, HttpException, HttpStatus } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { jwtConfig } from "../configs/jwt.config"
import { User } from "../models/user.model"

interface RefreshTokenPayload {
    _id: string
}

@Injectable()
export class TokenRefreshMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies[jwtConfig.cookieName]

        if(token) {
            if(/([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/.test(token)) {
                try {
                    const payload = jwt.decode(token) as RefreshTokenPayload
                    const user = await User.findById(payload._id)

                    if(user) {
                        req.user = { _id: user._id, login: user.login }
                        next()
                    }
                    else throw new HttpException("User not found", HttpStatus.NOT_FOUND)
                }
                catch(e: any) {
                    if(e instanceof HttpException) throw e
                    throw new HttpException("Refresh token format is invalid", HttpStatus.BAD_REQUEST)
                }
            }
            else throw new HttpException("Refresh token format is invalid", HttpStatus.BAD_REQUEST)
        }
        else throw new HttpException("Refresh cookie not found", HttpStatus.NOT_FOUND)
    }
}