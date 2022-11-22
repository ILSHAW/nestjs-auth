import { Controller, All, Req, Res } from "@nestjs/common"
import { AppService } from "../services/app.service"
import { Request, Response } from "express"

@Controller("/")
export class AppController {
    constructor(private readonly appService: AppService) {}
}