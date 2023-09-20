import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
const createConnection = (dbOptions) => {
    const defaultData = [{ username: "", password: "" }];
    const adapter = new JSONFile(dbOptions.connectionString);
    const db = new Low(adapter, defaultData);
    return {
        db
    };
};
export default createConnection;
//# sourceMappingURL=connection.js.map