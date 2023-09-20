import { compare, hash, genSalt } from "bcrypt";
export const hashData = async (data) => {
    const salt = await genSalt(10);
    const hashedData = await hash(data, salt);
    return hashedData;
};
export const compareData = async (data, hash) => {
    const isMatch = await compare(data, hash);
    return isMatch;
};
//# sourceMappingURL=hash.js.map