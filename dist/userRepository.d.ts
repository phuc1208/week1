import User from "./user.js";
import { DbConnection } from "./connection.js";
export interface IUserRepository {
    create({ username, password }: User): Promise<User>;
    find({ username }: User): Promise<User | undefined>;
}
declare const userRepository: (dbConnection: DbConnection) => IUserRepository;
export default userRepository;
