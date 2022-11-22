import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common"
import { AuthService } from "../services/auth.service"
import { Request, Response } from "express"
import { SignupGuard } from "../guards/signup.guard"
import { LoginGuard } from "../guards/login.guard"

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    @UseGuards(new SignupGuard())
    async signup(@Req() req: Request, @Res() res: Response) {
        return await this.authService.signup(req, res)
    }

    @Post("/login")
    @UseGuards(new LoginGuard())
    async login(@Req() req: Request, @Res() res: Response) {
        return await this.authService.login(req, res)
    }

    @Get("/logout")
    async logout(@Req() req: Request, @Res() res: Response) {
        return await this.authService.logout(req, res)
    }
}