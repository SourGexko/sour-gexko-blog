import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { join } from 'path';

// Modules
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : 'env.test',
      ignoreEnvFile: process.env.NODE_ENV !== 'dev',
      validationSchema: Joi.object({
        NODE_PATH: Joi.string().valid('dev', 'test'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required()
      })
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Post],
      synchronize: true,
      logging: true
    }),
    UsersModule,
    PostsModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
