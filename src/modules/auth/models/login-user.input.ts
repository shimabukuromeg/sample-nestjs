import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
    @Field({ nullable: false })
    email: string;

    @Field({ nullable: false })
    password: string;
}
