import { Controller, Req, Res, Get } from "@nestjs/common"
import { Request, Response } from "express"
import { TokenRefreshService } from "../services/token.refresh.service"

@Controller("/token/refresh")
export class TokenRefreshController {
    constructor(public tokenRefreshService: TokenRefreshService) {}

    @Get()
    async get(@Req() req: Request, @Res() res: Response) {
        await this.tokenRefreshService.get(req, res)
    }
}