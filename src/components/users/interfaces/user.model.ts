import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
    @Field((type) => String)
    id: string;

    @Field((type) => String)
    name: string;
}