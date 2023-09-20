import { JSONFile } from "lowdb/node";
import User from "./user.js";
import { Low } from "lowdb";

export interface DbOptions {
    readonly connectionString: string
}
export interface DbConnection {
    db: Low<User[]>
}

const createConnection = (dbOptions: DbOptions): DbConnection => {
    const defaultData: User[] = [{ username: "", password: "" }];
    const adapter = new JSONFile<User[]>(dbOptions.connectionString);
    const db = new Low<User[]>(adapter, defaultData);

    return {
        db
    }
}

export default createConnection;