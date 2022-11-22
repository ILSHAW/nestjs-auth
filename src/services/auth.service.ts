import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator"
import { User } from "../models/user.model"
import { config } from "../configs/jwt.config"

export class LoginDTO {
    @MaxLength(20, { message: "Login field must be shorter than or equal to 20 characters" })
    @MinLength(6, { message: "Login field must be longer than or equal to 6 characters" })
    @IsString({ message: "Login field must be a string" })
    @IsNotEmpty({ message: "Login field is required" })
    login: string
    @MaxLength(20, { message: "Password field must be shorter than or equal to 20 characters" })
    @MinLength(6, { message: "Password field must be longer than or equal to 6 characters" })
    @IsString({ message: "Password field must be a string" })
    @IsNotEmpty({ message: "Password field is required" })
    password: string

    constructor(data: { login: string, password: string }) {
        this.login = data.login
        this.password = data.password
    }
}
export class SignupDTO {
    @MaxLength(20, { message: "Login field must be shorter than or equal to 20 characters" })
    @MinLength(6, { message: "Login field must be longer than or equal to 6 characters" })
    @IsString({ message: "Login field must be a string" })
    @IsNotEmpty({ message: "Login field is required" })
    login: string
    @MaxLength(20, { message: "Password field must be shorter than or equal to 20 characters" })
    @MinLength(6, { message: "Password field must be longer than or equal to 6 characters" })
    @IsString({ message: "Password field must be a string" })
    @IsNotEmpty({ message: "Password field is required" })
    password: string

    constructor(data: { login: string, password: string }) {
        this.login = data.login
        this.password = data.password
    }
}

@Injectable()
export class AuthService {
    async signup(req: Request, res: Response) {
        const user = await User.create({ login: req.user.login, password: req.user.password })
        const { access, refresh } = user.createTokens()

        res.cookie(config.cookie.name, `Bearer ${refresh}`, { httpOnly: true, maxAge: config.expires.refresh, sameSite: "lax", domain: "ilshaw.com", secure: true })
        return res.status(201).send({ status: 201, message: "User successfully created", access })
    }
    async login(req: Request, res: Response) {
        const user = await User.findByLogin(req.user.login)
        const { access, refresh } = user.createTokens()

        res.cookie(config.cookie.name, `Bearer ${refresh}`, { httpOnly: true, maxAge: config.expires.refresh, sameSite: "lax", domain: "ilshaw.com", secure: true })
        return res.status(200).send({ status: 200, message: "Login successfully", access })
    }
    async logout(req: Request, res: Response) {
        res.cookie(config.cookie.name, null, { httpOnly: true, maxAge: 0, sameSite: "lax" })
        return res.status(200).send({ status: 200, message: "Logout successfully" })
    }
}