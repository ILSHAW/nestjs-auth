import { Module } from "@nestjs/common"
import { TokenRefreshController } from "../controllers/token.refresh.controller"
import { TokenRefreshService } from "../services/token.refresh.service"

@Module({
    imports: [],
    controllers: [TokenRefreshController],
    providers: [TokenRefreshService]
})
export class TokenRefreshModule {}