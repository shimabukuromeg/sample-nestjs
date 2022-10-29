import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { AuthResolver } from './auth.resolver';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';

@Module({
    imports: [
        PassportModule.register({
            session: true,
        }),
    ],
    providers: [AuthResolver, AuthService, LocalStrategy, AuthSerializer, PrismaService],
})
export class AuthModule { }
