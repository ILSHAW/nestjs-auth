import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { jwtConfig }  from "../configs/jwt.config"
import { User } from "../models/user.model"

interface RefreshTokenPayload {
    _id: string
}

@Injectable()
export class TokenRefreshService {
    async get(req: Request, res: Response) {
        const cookies = req.cookies
        const token = cookies[jwtConfig.cookieName]

        if(token) {
            if(/([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/.test(token)) {
                return jwt.verify(token, jwtConfig.secret, async (error, payload: RefreshTokenPayload) => {
                    if(!error) {
                        const user = await User.findById(payload._id)

                        if(user) {
                            const { access, refresh } = user.createTokens()

                            res.cookie(jwtConfig.cookieName, refresh, { httpOnly: true, maxAge: jwtConfig.refreshExpires*1000 })
                            res.status(200).send({ status: 200, message: "Tokens refreshed", access })
                        }
                        else throw new HttpException("User not found", HttpStatus.NOT_FOUND)
                    }
                    else throw new HttpException("Refresh token is invalid", HttpStatus.UNAUTHORIZED)
                })
            }
            else throw new HttpException("Refresh token format is invalid", HttpStatus.BAD_REQUEST)
        }
        else throw new HttpException("Refresh cookie not found", HttpStatus.NOT_FOUND)
    }
}