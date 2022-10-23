import { Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';

@Resolver(() => PostModel)
export class PostsResolver {
    constructor() {
        console.log("PostsResolver constructor");
    }

    @Query(() => [PostModel], { name: 'posts', nullable: true })
    async getPosts() {
        return [
            {
                id: '1',
                title: 'こんにちは',
            },
            {
                id: '2',
                title: 'こんばんわ',
            },
        ];
    }
}