import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dtos/create-user.dto";
import { User } from "./entities/user.entity";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly users: Repository<User>
    ) {}
    async createUser(
        { email, password, role, nickname }: CreateUserInput
    ): Promise<{ ok: boolean, error?: string}> {
        try {
            const exists = await this.users.findOne({ email });
            if (exists) {
                return { ok: false, error: "이미 가입되어있는 이메일입니다."}
            } else {
                await this.users.save(this.users.create({ email, nickname, password, role }))
                return { ok: true }
            }
        } catch (error) {
            return { ok: false, error: "아이디를 생성할 수 없습니다."}
        }
    } 
}