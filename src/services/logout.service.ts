import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import { jwtConfig } from "../configs/jwt.config"

@Injectable()
export class LogoutService {
    async get(req: Request, res: Response) {
        res.cookie(jwtConfig.cookieName, null, { httpOnly: true, maxAge: 0 })
        res.status(200).send({ status: 200, message: "Logout successful" })
    }
}