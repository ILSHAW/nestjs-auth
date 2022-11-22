import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common"
import { GoogleService } from "../services/google.service"
import { Request, Response } from "express"
import { GoogleGuard } from "../guards/google.guard"

@Controller("/google")
export class GoogleController {
    constructor(private readonly googleService: GoogleService) {}

    @Get("/login")
    @UseGuards(new GoogleGuard())
    async check(@Req() req: Request, @Res() res: Response) {}

    @Get("/callback")
    @UseGuards(new GoogleGuard())
    async refresh(@Req() req: Request, @Res() res: Response) {
        return await this.googleService.callback(req, res)
    }
}