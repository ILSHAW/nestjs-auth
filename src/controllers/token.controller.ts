import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common"
import { TokenService } from "../services/token.service"
import { Request, Response } from "express"
import { AccessGuard, RefreshGuard } from "../guards/jwt.guard"

@Controller("/token")
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get("/check")
    @UseGuards(new AccessGuard())
    async check(@Req() req: Request, @Res() res: Response) {
        return await this.tokenService.check(req, res)
    }

    @Get("/refresh")
    @UseGuards(new RefreshGuard())
    async refresh(@Req() req: Request, @Res() res: Response) {
        return await this.tokenService.refresh(req, res)
    }
}