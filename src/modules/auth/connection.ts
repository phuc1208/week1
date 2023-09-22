import low, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import User from "./user";

export interface DbOptions {
    readonly connectionString: string
}
export interface DbConnection {
    db: LowdbSync<User[]>
}

const createConnection = (dbOptions: DbOptions): DbConnection => {
    const defaultData: { users: User[] } = { users: [] };
    const adapter = new FileSync<User[]>(dbOptions.connectionString);
    const db = low(adapter);

    db.defaults({ ...defaultData }).write();

    return {
        db
    }
}

export default createConnection;