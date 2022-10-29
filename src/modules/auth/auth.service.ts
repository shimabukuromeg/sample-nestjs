import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { LoginUserInput } from './models/login-user.input';
import { RegisterUserInput } from './models/register-user.input';
import { User } from './models/user.interface';
import { PrismaService } from '../../prisma.service'

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {
        // console.log("hello");
    }

    async validateUser(user: LoginUserInput) {
        const foundUser = await this.prismaService.user.findUnique({
            where: {
                email: user.email
            }
        });

        if (!user || !(await compare(user.password, foundUser.password))) {
            throw new UnauthorizedException('Incorrect username or password');
        }
        const { password: _password, ...retUser } = foundUser;
        return retUser;
    }

    async registerUser(user: RegisterUserInput): Promise<Omit<User, 'password'>> {
        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email: user.email
            }
        });
        if (existingUser) {
            throw new BadRequestException('User remail must be unique');
        }
        if (user.password !== user.confirmationPassword) {
            throw new BadRequestException('Password and Confirmation Password must match');
        }
        const { confirmationPassword: _, ...newUser } = user;

        const u = await this.prismaService.user.create({
            data: {
                email: newUser.email,
                password: await hash(newUser.password, 12),
                isAdmin: false
            }
        })

        return {
            id: u.id,
            email: u.email,
            isAdmin: u.isAdmin,
        };
    }

    async findById(id: string): Promise<Omit<User, 'password'>> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            throw new BadRequestException(`No user found with id ${id}`);
        }
        return {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        };
    }
}
