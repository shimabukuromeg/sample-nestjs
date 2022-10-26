import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersResolver } from './user.resolvers';

@Module({
    providers: [UsersResolver, PrismaService],
})
export class UsersModule { }
