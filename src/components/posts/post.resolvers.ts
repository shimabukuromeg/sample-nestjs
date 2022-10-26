import { Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';
import { PrismaService } from '../../prisma.service'

@Resolver(() => PostModel)
export class PostsResolver {
    constructor(private readonly prismaService: PrismaService) {
        console.log("hello");
    }

    @Query(() => [PostModel], { name: 'posts', nullable: true })
    async getPosts() {
        return this.prismaService.post.findMany();
    }
}