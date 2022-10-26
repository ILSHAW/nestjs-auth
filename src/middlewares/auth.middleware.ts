import { Injectable, NestMiddleware, HttpException, HttpStatus } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { User } from "../models/user.model"

interface AccessTokenPayload {
    _id: string
    login: string
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const bearer = req.headers["authorization"]

        if(bearer) {
            if(/Bearer ([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/.test(bearer)) {
                const token = bearer.match(/([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/g)[0]
                
                try {
                    const payload = jwt.decode(token) as AccessTokenPayload
                    const user = await User.findById(payload._id)

                    if(user) {
                        req.user = { _id: user._id, login: user.login }
                        next()
                    }
                    else throw new HttpException("User not found", HttpStatus.NOT_FOUND)
                }
                catch(e: any) {
                    if(e instanceof HttpException) throw e
                    throw new HttpException("Access token format is invalid", HttpStatus.BAD_REQUEST)
                }
            }
            else throw new HttpException("Authorization header format is invalid", HttpStatus.BAD_REQUEST)
        }
        else throw new HttpException("Authorization header not found", HttpStatus.NOT_FOUND)
    }
}