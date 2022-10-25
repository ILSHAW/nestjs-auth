import { Module } from "@nestjs/common"
import { AppController } from "../controllers/app.controller"
import { AppService } from "../services/app.service"
import { LoginModule } from "./login.module"
import { SignupModule } from "./signup.module"
import { LogoutModule } from "./logout.module"
import { TokenRefreshModule } from "./token.refresh.module"

@Module({
  imports: [SignupModule, LoginModule, LogoutModule, TokenRefreshModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
