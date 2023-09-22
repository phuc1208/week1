"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign, verify } = jsonwebtoken_1.default;
const createTokenGenerator = (tokenOptions) => {
    const result = {
        async signToken(payload) {
            const accessToken = sign(payload, tokenOptions.key, { expiresIn: '10m' });
            const refreshToken = sign(payload, tokenOptions.key, { expiresIn: '1d' });
            const result = {
                accessToken,
                refreshToken
            };
            return result;
        },
        async verifyToken(token) {
            const payload = verify(token, tokenOptions.key);
            return { username: 'test...' };
        }
    };
    return result;
};
exports.default = createTokenGenerator;
//# sourceMappingURL=token.js.map