import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';

@Resolver(() => UserModel)
export class UsersResolver {
    constructor() {
        console.log("PostsResolver constructor");
    }

    @Query(() => [UserModel], { name: 'users', nullable: true })
    async getPosts() {
        return [
            {
                id: '1',
                name: '太郎',
            },
            {
                id: '2',
                name: '次郎',
            },
        ];
    }
}