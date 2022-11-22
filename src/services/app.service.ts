import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"

@Injectable()
export class AppService {
    async hello(req: Request, res: Response) {
        return res.send({ status: 404, message: "Hello world" })
    }
    async notfound(req: Request, res: Response) {
        return res.send({ status: 404, message: "Route not found" })
    }
}