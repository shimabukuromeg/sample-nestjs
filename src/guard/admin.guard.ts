import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { LoggedInGuard } from './logged-in.guard';

@Injectable()
export class AdminGuard extends LoggedInGuard {
    canActivate(context: ExecutionContext): boolean {
        console.log("== call AdminGuard canActivate ==");

        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;

        if (gqlReq) {
            return gqlReq.isAuthenticated() && gqlReq.session.passport.user.isAdmin;
        }

        const req = context.switchToHttp().getRequest();
        return super.canActivate(context) && req.session.passport.user.isAdmin;
    }
}
