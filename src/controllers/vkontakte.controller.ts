import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common"
import { VkontakteService } from "../services/vkontakte.service"
import { Request, Response } from "express"
import { VkontakteGuard } from "../guards/vkontakte.guard"

@Controller("/vkontakte")
export class VkontakteController {
    constructor(private readonly vkontakteService: VkontakteService) {}

    @Get("/login")
    @UseGuards(new VkontakteGuard())
    async check(@Req() req: Request, @Res() res: Response) {}

    @Get("/callback")
    @UseGuards(new VkontakteGuard())
    async refresh(@Req() req: Request, @Res() res: Response) {
        return await this.vkontakteService.callback(req, res)
    }
}