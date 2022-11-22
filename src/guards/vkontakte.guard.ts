import { ExecutionContext, Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class VkontakteGuard extends AuthGuard("vkontakte") {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        return super.canActivate(context) as boolean
    }
    handleRequest<TUser = any>(error: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if(error) { throw new HttpException("Failed to login with vkontakte", HttpStatus.BAD_REQUEST) }
        else return user
    }
}