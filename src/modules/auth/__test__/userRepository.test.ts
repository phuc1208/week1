import { CREATE_USER_DATA } from './fixtures/user.fixture';
import {
    DbConnection,
    IUserRepository,
    createConnection,
    userRepository
} from '@modules/auth';

describe("[TEST] UserRepository functionalities", () => {
    let userRepoMock: IUserRepository = null;
    let dbConnection: DbConnection = null;
    beforeEach(() => {
        dbConnection = createConnection({ connectionString: "src/__test__/data/fakedb.json" });
    });

    afterEach(() => {
        dbConnection.db.setState([]).write();
    })

    test("[FUNCTION] Testing create function result in successful case", async () => {
        // arrange
        jest.spyOn(dbConnection.db, 'write')
            .mockReturnValue(Promise.resolve());

        userRepoMock = userRepository(dbConnection);
        // act
        const user = await userRepoMock.create(CREATE_USER_DATA);

        // assert
        expect(dbConnection.db.write).toHaveBeenCalled();
        expect(user).toBeTruthy();
        expect(user).toEqual(CREATE_USER_DATA);
    })

    test("[FUNCTION] Testing find function while user does not found on database result in undefined result", async () => {
        // arrange
        userRepoMock = userRepository(dbConnection);
        // act
        const user = await userRepoMock.find(CREATE_USER_DATA);
        // arrange
        expect(user).toBeUndefined();
    })

    test("[FUNCTION] testing find function while user has exist on database result in successful case", async () => {
        // arrange
        dbConnection.db.get("users").push(CREATE_USER_DATA).write();
        userRepoMock = userRepository(dbConnection);

        // act
        const user = await userRepoMock.find(CREATE_USER_DATA);

        // arrange
        expect(user).toBeTruthy();
        expect(user).toEqual(CREATE_USER_DATA);
    })
})