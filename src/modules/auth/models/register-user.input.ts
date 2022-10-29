import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
    @Field({ nullable: false })
    email: string;

    @Field({ nullable: false })
    password: string;

    @Field({ nullable: false })
    confirmationPassword: string;
}
