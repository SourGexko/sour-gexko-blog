import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Post extends CoreEntity {
    @Field(type => String)
    @Column()
    writtenBy: string;

    @Field(type => String)
    @Column()
    postContent: string;
}