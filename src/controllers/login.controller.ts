import { Controller, Post, Req, Res, Body } from "@nestjs/common"
import { Request, Response } from "express"
import { LoginService, LoginDTO } from "../services/login.service"

@Controller("/login")
export class LoginController {
    constructor(public loginService: LoginService) {}

    @Post()
    async post(@Req() req: Request, @Res() res: Response, @Body() loginDTO: LoginDTO) {
        await this.loginService.post(req, res, loginDTO)
    }
}