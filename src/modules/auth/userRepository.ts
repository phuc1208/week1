import User from "./user";
import { DbConnection } from "./connection";

export interface IUserRepository {
    create({ username, password }: User): Promise<User>;
    find({ username }: User): Promise<User | undefined>;
}

const userRepository = (dbConnection: DbConnection): IUserRepository => {
    const db = dbConnection.db;
    const result = {
        async create({ username, password }: User): Promise<User> {
            const user = { username, password };
            db.get("users")
                .push({ ...user })
                .write();
            return user;
        },
        async find({ username }: User): Promise<User | undefined> {
            const users = db.get("users");
            const index = users.findIndex(user => user.username === username).value();
            if (index === -1) {
                return undefined;
            }

            const user = users.get(index).value();
            return { ...user };
        }
    }

    return result;
}

export default userRepository;