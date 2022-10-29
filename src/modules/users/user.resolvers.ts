import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';
import { PrismaService } from '../../prisma.service'
import { LoggedInGuard } from '../../guard/logged-in.guard';
import { AdminGuard } from '../../guard/admin.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserModel)
export class UsersResolver {
    constructor(private readonly prismaService: PrismaService) {
        // console.log("hello");
    }

    // NOTE:ログイン済みのユーザーのみが実行できる
    @UseGuards(LoggedInGuard)
    @Query(() => [UserModel], { name: 'users', nullable: true })
    async getUsers() {
        return this.prismaService.user.findMany({
            where: {
                isAdmin: false
            }
        });
    }

    // NOTE: Adminロールを持ったユーザーのみが実行できる
    @UseGuards(AdminGuard)
    @Query(() => [UserModel], { name: 'allUsers', nullable: true })
    async getAllUsers() {
        return this.prismaService.user.findMany();
    }
}