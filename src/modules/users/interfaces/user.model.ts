import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class UserModel {

    @Field(() => ID, { nullable: false })
    id!: number;

    @Field(() => String, { nullable: false })
    email!: string;

    @HideField()
    password!: string;

    @HideField()
    createdAt!: Date;

    @HideField()
    updatedAt!: Date;
}
