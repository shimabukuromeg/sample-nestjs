import { Module } from '@nestjs/common';
import { UsersResolver } from './user.resolvers';

@Module({
    providers: [UsersResolver],
})
export class UsersModule { }
