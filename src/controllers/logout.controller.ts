import { Controller, Req, Res, Get, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"
import { LogoutService } from "../services/logout.service"
import { AuthGuard } from "../guards/auth.guard"

@Controller("/logout")
export class LogoutController {
    constructor(public logoutService: LogoutService) {}

    @Get()
    @UseGuards(new AuthGuard())
    async get(@Req() req: Request, @Res() res: Response) {
        await this.logoutService.get(req, res)
    }
}