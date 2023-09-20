import { TokenGeneration, TokenGenerator } from "./token.js";
import User from "./user.js";
import { IUserRepository } from "./userRepository.js";
export interface IUserService {
    signUp({ username, password }: User): Promise<Omit<User, "password">>;
    login({ username, password }: User): Promise<TokenGeneration & Omit<User, "password">>;
}
declare const userService: (userRepository: IUserRepository, tokenGenerator: TokenGenerator) => IUserService;
export default userService;
