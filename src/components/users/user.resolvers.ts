import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';
import { PrismaService } from '../../prisma.service'

@Resolver(() => UserModel)
export class UsersResolver {
    constructor(private readonly prismaService: PrismaService) {
        console.log("hello");
    }

    @Query(() => [UserModel], { name: 'users', nullable: true })
    async getUsers() {
        return this.prismaService.user.findMany();
    }
}