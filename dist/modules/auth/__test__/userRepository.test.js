"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_fixture_1 = require("./fixtures/user.fixture");
const auth_1 = require("@modules/auth");
describe("[TEST] UserRepository functionalities", () => {
    let userRepoMock = null;
    let dbConnection = null;
    beforeEach(() => {
        dbConnection = (0, auth_1.createConnection)({ connectionString: "src/__test__/data/fakedb.json" });
    });
    afterEach(() => {
        dbConnection.db.setState([]).write();
    });
    test("[FUNCTION] Testing create function result in successful case", async () => {
        jest.spyOn(dbConnection.db, 'write')
            .mockReturnValue(Promise.resolve());
        userRepoMock = (0, auth_1.userRepository)(dbConnection);
        const user = await userRepoMock.create(user_fixture_1.CREATE_USER_DATA);
        expect(dbConnection.db.write).toHaveBeenCalled();
        expect(user).toBeTruthy();
        expect(user).toEqual(user_fixture_1.CREATE_USER_DATA);
    });
    test("[FUNCTION] Testing find function while user does not found on database result in undefined result", async () => {
        userRepoMock = (0, auth_1.userRepository)(dbConnection);
        const user = await userRepoMock.find(user_fixture_1.CREATE_USER_DATA);
        expect(user).toBeUndefined();
    });
    test("[FUNCTION] testing find function while user has exist on database result in successful case", async () => {
        dbConnection.db.get("users").push(user_fixture_1.CREATE_USER_DATA).write();
        userRepoMock = (0, auth_1.userRepository)(dbConnection);
        const user = await userRepoMock.find(user_fixture_1.CREATE_USER_DATA);
        expect(user).toBeTruthy();
        expect(user).toEqual(user_fixture_1.CREATE_USER_DATA);
    });
});
//# sourceMappingURL=userRepository.test.js.map