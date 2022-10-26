import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"
import { TokenRefreshController } from "../controllers/token.refresh.controller"
import { TokenRefreshService } from "../services/token.refresh.service"
import { TokenRefreshMiddleware } from "../middlewares/token.refresh.middleware"

@Module({
    imports: [],
    controllers: [TokenRefreshController],
    providers: [TokenRefreshService]
})
export class TokenRefreshModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TokenRefreshMiddleware).forRoutes(TokenRefreshController)
    }
}