import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}
    @Query(returns => String)
    getHi() {
        return "Hello"
    }

    @Mutation(returns => CreateUserOutput)
    async createUser(
        @Args('input') createUserInput: CreateUserInput
    ): Promise<CreateUserOutput> {
        try {
            const { ok, error } = await this.usersService.createUser(createUserInput)
            if (error) {
                return {
                    ok, 
                    error
                }
            }
            return {
                ok
            }
        } catch (error) {
            return {
                ok: false,
                error
            }
        }
        
    }
}