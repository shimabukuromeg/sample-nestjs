import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("== call LocalGuard canActivate ==");

        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;
        const result = (await super.canActivate(context)) as boolean;

        console.log("== call canActivate gqlReq before ==", gqlReq.session)

        // logIn を実行する
        // 👇
        // シリアライズの処理が呼ばれる
        // 👇
        // user情報付与される
        // 例.
        // Session {
        //    ..
        //    passport: { user: { id: 'aaa', isAdmin: false } }
        // }
        await super.logIn(gqlReq);

        console.log("== call canActivate gqlReq after ==", gqlReq.session)

        return result;
    }

    getRequest(context: ExecutionContext) {
        console.log("== call LocalGuard getRequest ==");

        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;

        if (gqlReq) {
            const { input } = ctx.getArgs();
            gqlReq.body = input;

            return gqlReq;
        }
        return context.switchToHttp().getRequest();
    }
}