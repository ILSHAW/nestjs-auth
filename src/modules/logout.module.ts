import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"
import { LogoutController } from "../controllers/logout.controller"
import { LogoutService } from "../services/logout.service"
import { AuthMiddleware } from "../middlewares/auth.middleware"

@Module({
    imports: [],
    controllers: [LogoutController],
    providers: [LogoutService]
})
export class LogoutModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(LogoutController)
    }
}