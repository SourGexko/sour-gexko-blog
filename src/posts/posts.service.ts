import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dtos/create-post.dto";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly post: Repository<Post>
    ) {}

    getAll(): Promise<Post[]> {
        return this.post.find()
    }

    async createPost({ writtenBy, postContent }: CreatePostDto): Promise<Boolean> {
        const post = this.post.create({ writtenBy,postContent })
        await this.post.save(post);
        return true;
    }
}