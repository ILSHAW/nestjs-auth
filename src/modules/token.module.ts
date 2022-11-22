import { Module } from "@nestjs/common"
import { TokenController } from "../controllers/token.controller"
import { TokenService } from "../services/token.service"
import { AccessStrategy, RefreshStrategy } from "../strategies/jwt.strategy"

@Module({
    controllers: [TokenController],
    providers: [TokenService, AccessStrategy, RefreshStrategy]
})
export class TokenModule {}