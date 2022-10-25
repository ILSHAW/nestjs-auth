import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { Request, Response } from "express"
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator"
import { User } from "../models/user.model"
import { jwtConfig } from "../configs/jwt.config"

export class LoginDTO {
    @MaxLength(20)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    login: string

    @MaxLength(20)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string
}

@Injectable()
export class LoginService {
    async post(req: Request, res: Response, loginDTO: LoginDTO) {
        const user = await User.findByLogin(loginDTO.login)

        if(user) {
            if(await user.verifyPassword(loginDTO.password)) {
                const { access, refresh } = user.createTokens()

                res.cookie(jwtConfig.cookieName, refresh, { httpOnly: true, maxAge: jwtConfig.refreshExpires*1000 })
                res.status(200).send({ status: 200, message: "User authenticated", access })
            }
            else throw new HttpException("Bad password", HttpStatus.FORBIDDEN)
        }
        else throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }
}