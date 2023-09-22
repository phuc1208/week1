"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const createConnection = (dbOptions) => {
    const defaultData = { users: [] };
    const adapter = new FileSync_1.default(dbOptions.connectionString);
    const db = (0, lowdb_1.default)(adapter);
    db.defaults({ ...defaultData }).write();
    return {
        db
    };
};
exports.default = createConnection;
//# sourceMappingURL=connection.js.map