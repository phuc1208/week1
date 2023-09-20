import User from "./user.js";
import { Low } from "lowdb";
export interface DbOptions {
    readonly connectionString: string;
}
export interface DbConnection {
    db: Low<User[]>;
}
declare const createConnection: (dbOptions: DbOptions) => DbConnection;
export default createConnection;
