import { Module } from "@nestjs/common"
import { GoogleController } from "../controllers/google.controller"
import { GoogleService } from "../services/google.service"
import { GoogleStrategy } from "../strategies/google.strategy"

@Module({
    controllers: [GoogleController],
    providers: [GoogleService, GoogleStrategy]
})
export class GoogleModule {}