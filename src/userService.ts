import { BadRequestError } from "./error.js"
import { compareData, hashData } from "./hash.js";
import { TokenGeneration, TokenGenerator } from "./token.js";
import User from "./user.js";
import { IUserRepository } from "./userRepository.js";

export interface IUserService {
    signUp({ username, password }: User): Promise<Omit<User, "password">>;
    login({ username, password }: User): Promise<TokenGeneration & Omit<User, "password">>
}

const userService = (userRepository: IUserRepository, tokenGenerator: TokenGenerator): IUserService => {
    const result = {
        async signUp({ username, password }: User): Promise<Omit<User, "password">> {
            const user = await userRepository.find({ username, password });

            if (user) {
                throw new BadRequestError(`user ${username} has existed`);
            }


            const hashedPassword = await hashData(password);
            const _user = await userRepository.create({
                username,
                password: hashedPassword
            });

            delete _user.password;
            return _user;
        },
        async login({ username, password }: User): Promise<TokenGeneration & Omit<User, "password">> {
            const user = await userRepository.find({ username, password });

            if (!user) {
                throw new BadRequestError(`user '${username}' does not existed`);
            }

            const isMatch = await compareData(password, user.password);
            if (!isMatch) {
                throw new BadRequestError(`password does not matched`);
            }

            const tokens = await tokenGenerator.signToken({ username });

            delete user.password;
            return {
                ...tokens,
                ...user
            }
        }
    }

    return result;
}

export default userService;