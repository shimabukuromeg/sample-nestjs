import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        console.log("== call LocalStrategy constructor ==");
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string) {
        console.log("== call LocalStrategy validate ==");

        const user = await this.authService.validateUser({ email, password });
        return user
    }
}
