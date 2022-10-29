import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LocalGuard } from '../../guard/local.guard';
import { LoginUserInput } from './models/login-user.input';
import { RegisterUserInput } from './models/register-user.input';
import { UserModel } from '../users/interfaces/user.model';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalGuard)
    @Mutation(() => UserModel, { nullable: true })
    async login(
        @Args('input') input: LoginUserInput,
        @Context() context
    ) {
        console.log("== call AuthResolver login mutation ==");

        return context.req.user
    }

    @Mutation(() => UserModel, { nullable: true })
    async register(
        @Args('input') input: RegisterUserInput,
        @Context() context
    ) {
        console.log("== call AuthResolver login mutation ==");

        return this.authService.registerUser(input)
    }
}
