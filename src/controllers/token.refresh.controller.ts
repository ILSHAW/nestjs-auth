import { Controller, Req, Res, Get, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"
import { TokenRefreshService } from "../services/token.refresh.service"
import { TokenRefreshGuard } from "../guards/token.refresh.guard"

@Controller("/token/refresh")
export class TokenRefreshController {
    constructor(public tokenRefreshService: TokenRefreshService) {}

    @Get()
    @UseGuards(new TokenRefreshGuard())
    async get(@Req() req: Request, @Res() res: Response) {
        await this.tokenRefreshService.get(req, res)
    }
}