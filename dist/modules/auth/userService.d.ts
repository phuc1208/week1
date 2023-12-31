import { TokenGeneration, TokenGenerator } from "@lib/token";
import User from "./user";
import { IUserRepository } from "./userRepository";
export interface IUserService {
    signUp({ username, password }: User): Promise<Omit<User, "password">>;
    login({ username, password }: User): Promise<TokenGeneration & Omit<User, "password">>;
}
declare const userService: (userRepository: IUserRepository, tokenGenerator: TokenGenerator) => IUserService;
export default userService;
