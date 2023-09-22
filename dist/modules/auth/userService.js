"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("@lib/error");
const hash_1 = require("@lib/hash");
const userService = (userRepository, tokenGenerator) => {
    const result = {
        async signUp({ username, password }) {
            const user = await userRepository.find({ username, password });
            if (user) {
                throw new error_1.BadRequestError(`user ${username} has existed`);
            }
            const hashedPassword = await (0, hash_1.hashData)(password);
            const _user = await userRepository.create({
                username,
                password: hashedPassword
            });
            delete _user.password;
            return _user;
        },
        async login({ username, password }) {
            const user = await userRepository.find({ username, password });
            if (!user) {
                throw new error_1.BadRequestError(`user '${username}' does not existed`);
            }
            const isMatch = await (0, hash_1.compareData)(password, user.password);
            if (!isMatch) {
                throw new error_1.BadRequestError(`password does not matched`);
            }
            const tokens = await tokenGenerator.signToken({ username });
            delete user.password;
            return {
                ...tokens,
                ...user
            };
        }
    };
    return result;
};
exports.default = userService;
//# sourceMappingURL=userService.js.map