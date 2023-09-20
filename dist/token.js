import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
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
export default createTokenGenerator;
//# sourceMappingURL=token.js.map