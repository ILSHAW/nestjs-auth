import { Module } from "@nestjs/common"
import { AppController } from "../controllers/app.controller"
import { AppService } from "../services/app.service"
import { AuthModule } from "./auth.module"
import { TokenModule } from "./token.module"
import { GoogleModule } from "./google.module"
import { VkontakteModule } from "./vkontakte.module"

@Module({
	imports: [AuthModule, TokenModule, GoogleModule, VkontakteModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
