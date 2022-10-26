import { Module } from '@nestjs/common';
import { PostsResolver } from './post.resolvers';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [PostsResolver, PrismaService],
})
export class PostsModule { }
