import { Controller, Req, Res, Post, Body } from "@nestjs/common"
import { Request, Response } from "express"
import { SignupService, SignupDTO } from "../services/signup.service"

@Controller("/signup")
export class SignupController {
    constructor(public signupService: SignupService) {}

    @Post()
    async post(@Req() req: Request, @Res() res: Response, @Body() signupDTO: SignupDTO) {
        await this.signupService.post(req, res, signupDTO)
    }
}