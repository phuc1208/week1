"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository = (dbConnection) => {
    const db = dbConnection.db;
    const result = {
        async create({ username, password }) {
            const user = { username, password };
            db.get("users")
                .push({ ...user })
                .write();
            return user;
        },
        async find({ username }) {
            const users = db.get("users");
            const index = users.findIndex(user => user.username === username).value();
            if (index === -1) {
                return undefined;
            }
            const user = users.get(index).value();
            return { ...user };
        }
    };
    return result;
};
exports.default = userRepository;
//# sourceMappingURL=userRepository.js.map