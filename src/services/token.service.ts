import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import { User } from "../models/user.model"
import { config } from "../configs/jwt.config"

@Injectable()
export class TokenService {
    async check(req: Request, res: Response) {
        return res.status(200).send({ status: 200, message: "Token is valid" })
    }
	async refresh(req: Request, res: Response) {
        const user = await User.findById(req.user.id)
        const { access, refresh } = user.createTokens()

        res.cookie(config.cookie.name, `Bearer ${refresh}`, { httpOnly: true, maxAge: config.expires.refresh, sameSite: "lax", domain: "ilshaw.com", secure: true })
        return res.status(200).send({ status: 200, message: "Tokens successfully refreshed", access })
    }
}