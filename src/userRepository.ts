import User from "./user.js";
import { DbConnection } from "./connection.js";

export interface IUserRepository {
    create({ username, password }: User): Promise<User>;
    find({ username }: User): Promise<User | undefined>;
}

const userRepository = (dbConnection: DbConnection): IUserRepository => {
    const db = dbConnection.db;
    const result = {
        async create({ username, password }: User): Promise<User> {
            const user = { username, password };
            db.data.push(user);
            await db.write();
            return user;
        },
        async find({ username }: User): Promise<User | undefined> {
            await db.read()
            const index = db.data.findIndex(user => user.username === username);
            if (index === -1) {
                return undefined;
            }

            return db.data[index];
        }
    }

    return result;
}

export default userRepository;