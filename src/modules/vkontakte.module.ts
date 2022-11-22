import { Module } from "@nestjs/common"
import { VkontakteController } from "../controllers/vkontakte.controller"
import { VkontakteService } from "../services/vkontakte.service"
import { VkontakteStrategy } from "../strategies/vkontakte.strategy"

@Module({
    controllers: [VkontakteController],
    providers: [VkontakteService, VkontakteStrategy]
})
export class VkontakteModule {}