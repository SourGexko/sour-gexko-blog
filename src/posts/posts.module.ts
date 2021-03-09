import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostsResolver, PostsService]
})
export class PostsModule {}
