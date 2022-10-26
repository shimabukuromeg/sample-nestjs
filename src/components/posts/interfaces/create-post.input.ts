import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
    @Field({ nullable: false })
    title: string;
}
