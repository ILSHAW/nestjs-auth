import { Module } from "@nestjs/common"
import { AuthController } from "../controllers/auth.controller"
import { AuthService } from "../services/auth.service"
import { SignupStrategy } from "../strategies/signup.strategy"
import { LoginStrategy } from "../strategies/login.strategy"

@Module({
    controllers: [AuthController],
    providers: [AuthService, SignupStrategy, LoginStrategy]
})
export class AuthModule {}