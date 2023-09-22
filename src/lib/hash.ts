import { compare, hash, genSalt } from "bcrypt";

export const hashData = async (data: string): Promise<string> => {
    const salt = await genSalt(10);
    const hashedData = await hash(data, salt);
    return hashedData;
}

export const compareData = async (data: string, hash: string): Promise<boolean> => {
    const isMatch = await compare(data, hash);
    return isMatch;
}