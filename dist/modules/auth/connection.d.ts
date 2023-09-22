import { LowdbSync } from "lowdb";
import User from "./user";
export interface DbOptions {
    readonly connectionString: string;
}
export interface DbConnection {
    db: LowdbSync<User[]>;
}
declare const createConnection: (dbOptions: DbOptions) => DbConnection;
export default createConnection;
