import { Controller, Req, Res, Get } from "@nestjs/common"
import { Request, Response } from "express"
import { LogoutService } from "../services/logout.service"

@Controller("/logout")
export class LogoutController {
    constructor(public logoutService: LogoutService) {}

    @Get()
    async get(@Req() req: Request, @Res() res: Response) {
        await this.logoutService.get(req, res)
    }
}