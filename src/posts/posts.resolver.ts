import {  } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CreatePostDto } from "./dtos/create-post.dto";
import { Post } from "./entities/post.entity";
import { PostsService } from "./posts.service";

@Resolver(of => Post)
export class PostsResolver {
    constructor(private readonly postsService: PostsService) {}

    @Query(returns => [Post])
    getPosts(): Promise<Post[]> {
        return this.postsService.getAll()
    }

    @Mutation(returns => Boolean)
    async createPost(
        @Args('input') createPostDto: CreatePostDto
    ): Promise<Boolean> {
        try {
            await this.postsService.createPost(createPostDto)
            return true;
        } catch (e) {
            console.log(e)
        }
    }
}