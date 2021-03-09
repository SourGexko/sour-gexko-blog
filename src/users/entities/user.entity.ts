import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum UserRole {
    Master,
    Visitor
}

registerEnumType(UserRole, {
    name: 'UserRole'
})

@InputType({ isAbstract: true })
@Entity()
@ObjectType()
export class User extends CoreEntity {
    @Column()
    @Field(type => String)
    @IsEmail()
    email: string;

    @Column()
    @Field(type => String)
    @IsString()
    nickname: string;

    @Column()
    @Field(type => String)
    @IsString()
    @Length(6, 15)
    password: string;

    @Column({ default: 1 })
    @Field(type => UserRole, { defaultValue: 1 })
    @IsEnum(UserRole)
    role: UserRole
}