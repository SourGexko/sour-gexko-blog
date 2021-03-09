import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class CreateUserInput extends PickType(User, ["email", "password", "role", "nickname"]) {}

@ObjectType()
export class CreateUserOutput {
    @Field(type => String, { nullable: true })
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}