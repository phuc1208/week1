import User from "./user";
import { DbConnection } from "./connection";
export interface IUserRepository {
    create({ username, password }: User): Promise<User>;
    find({ username }: User): Promise<User | undefined>;
}
declare const userRepository: (dbConnection: DbConnection) => IUserRepository;
export default userRepository;
