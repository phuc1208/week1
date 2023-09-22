export type TokenOptions = {
    key: string;
};
export type TokenPayload = {
    username: string;
};
export type TokenGeneration = {
    refreshToken: string;
    accessToken: string;
};
export type TokenGenerator = {
    signToken: (payload: TokenPayload) => Promise<TokenGeneration>;
    verifyToken: (token: string) => Promise<TokenPayload>;
};
declare const createTokenGenerator: (tokenOptions: TokenOptions) => TokenGenerator;
export default createTokenGenerator;
