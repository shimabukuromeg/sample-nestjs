import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from './models/user.interface';

@Injectable()
export class AuthSerializer extends PassportSerializer {
    constructor(private readonly authService: AuthService) {
        super();
    }
    // ログインした後にこいつが呼ばれずユーザー情報が付与されていないのが問題っぽい？
    serializeUser(user: User, done: (err: Error, user: { id: string; isAdmin: boolean }) => void) {
        console.log("== call serializeUser ==");

        done(null, { id: user.id, isAdmin: user.isAdmin });
    }

    async deserializeUser(payload: { id: string; isAdmin: boolean }, done: (err: Error, user: Omit<User, 'password'>) => void) {
        console.log("== call deserializeUser ==");

        const user = await this.authService.findById(payload.id);
        done(null, user);
    }
}

