import jwt from "jsonwebtoken";

const { sign, verify } = jwt;
export type TokenOptions = {
    key: string
}

export type TokenPayload = {
    username: string
}

export type TokenGeneration = {
    refreshToken: string,
    accessToken: string,
}

export type TokenGenerator = {
    signToken: (payload: TokenPayload) => Promise<TokenGeneration>,
    verifyToken: (token: string) => Promise<TokenPayload>
}

const createTokenGenerator = (tokenOptions: TokenOptions): TokenGenerator => {
    const result = {
        async signToken(payload: TokenPayload): Promise<TokenGeneration> {
            const accessToken = sign(payload, tokenOptions.key, { expiresIn: '10m' });
            const refreshToken = sign(payload, tokenOptions.key, { expiresIn: '1d' });

            const result = {
                accessToken,
                refreshToken
            }
            return result;
        },

        async verifyToken(token: string): Promise<TokenPayload> {
            const payload = verify(token, tokenOptions.key);
            //TODO: fixed return tokenpayload
            return { username: 'test...' };
        }
    }

    return result;
}

export default createTokenGenerator;