const userRepository = (dbConnection) => {
    const db = dbConnection.db;
    const result = {
        async create({ username, password }) {
            const user = { username, password };
            db.data.push(user);
            await db.write();
            return user;
        },
        async find({ username }) {
            await db.read();
            const index = db.data.findIndex(user => user.username === username);
            if (index === -1) {
                return undefined;
            }
            return db.data[index];
        }
    };
    return result;
};
export default userRepository;
//# sourceMappingURL=userRepository.js.map