import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


@Injectable()
export class LoggedInGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        console.log("== call LoggedInGuard canActivate ==");

        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;

        if (gqlReq) {
            return gqlReq.isAuthenticated();
        }

        return context.switchToHttp().getRequest().isAuthenticated();
    }
}
