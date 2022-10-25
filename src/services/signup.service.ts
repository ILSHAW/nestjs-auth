import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator"
import { User } from "../models/user.model"
import { jwtConfig } from "../configs/jwt.config"

export class SignupDTO {
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
export class SignupService {
    async post(req: Request, res: Response, signupDTO: SignupDTO) {
        const user = await User.findByLogin(signupDTO.login)

        if(!user) {
            const user = await User.create({
                login: signupDTO.login,
                password: signupDTO.password
            })

            const { access, refresh } = user.createTokens()

            res.cookie(jwtConfig.cookieName, refresh, { httpOnly: true, maxAge: jwtConfig.refreshExpires*1000 })
            res.status(201).send({ status: 201, message: "User created", access })
        }
        else throw new HttpException("Login taken", HttpStatus.CONFLICT)
    }
}