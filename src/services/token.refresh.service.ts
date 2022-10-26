import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { Request, Response } from "express"
import { jwtConfig }  from "../configs/jwt.config"
import { User } from "../models/user.model"

@Injectable()
export class TokenRefreshService {
    async get(req: Request, res: Response) {
        const user = await User.findById(req.user._id)

        if(user) {
            const { access, refresh } = user.createTokens()

            res.cookie(jwtConfig.cookieName, refresh, { httpOnly: true, maxAge: jwtConfig.refreshExpires*1000 })
            res.status(200).send({ status: 200, message: "Tokens refreshed", access })
        }
        else throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }
}