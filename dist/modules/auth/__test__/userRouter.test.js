"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_fixture_1 = require("./fixtures/user.fixture");
const error_1 = require("@lib/error");
const _root_1 = __importDefault(require("@root"));
describe("[TEST] UserRouter functionalities", () => {
    let _userService;
    let server;
    let container;
    beforeAll(async () => {
        const resolve = await (0, _root_1.default)();
        server = resolve.fastify;
        container = resolve.container;
        _userService = container.resolve("userService");
    });
    afterAll(() => {
        server.close();
    });
    describe("[TEST] /auth/signup", () => {
        test("[FUNCTION] Testing POST /auth/signup endpoint with user input has existed result in bad request response", async () => {
            jest.spyOn(_userService, 'signUp')
                .mockImplementation(() => Promise.reject(new error_1.BadRequestError("something bad")));
            const response = await server.inject({
                method: "POST",
                url: "/auth/signup",
                payload: user_fixture_1.CREATE_USER_DATA
            });
            expect(response.statusCode).toBe(400);
            const json = response.json();
            expect(json.error).toBeTruthy();
        });
        test("[FUNCTION] Testing POST /auth/signup endpoint with user input does not exist result in ok response", async () => {
            jest.spyOn(_userService, 'signUp')
                .mockImplementation(() => Promise.resolve(user_fixture_1.CREATE_USER_DATA));
            const response = await server.inject({
                method: "POST",
                url: "/auth/signup",
                payload: user_fixture_1.CREATE_USER_DATA
            });
            expect(response.statusCode).toBe(200);
            const json = response.json();
            expect(json).toBeTruthy();
            expect(json).toEqual(user_fixture_1.CREATE_USER_DATA);
        });
    });
    describe("[TEST] /auth/login", () => {
        test("[FUNCTION] Testing POST /auth/login endpoint with user input has existed result in bad request response", async () => {
            jest.spyOn(_userService, 'login')
                .mockImplementation(() => Promise.reject(new error_1.BadRequestError("something bad")));
            const response = await server.inject({
                method: "POST",
                url: "/auth/login",
                payload: user_fixture_1.CREATE_USER_DATA
            });
            expect(response.statusCode).toBe(400);
            const json = response.json();
            expect(json.error).toBeTruthy();
        });
        test("[FUNCTION] Testing POST /auth/login endpoint with user input does not exist result in ok response", async () => {
            jest.spyOn(_userService, 'login')
                .mockImplementation(() => Promise.resolve({
                username: user_fixture_1.CREATE_USER_DATA.username,
                accessToken: "",
                refreshToken: ""
            }));
            const response = await server.inject({
                method: "POST",
                url: "/auth/login",
                payload: user_fixture_1.CREATE_USER_DATA
            });
            expect(response.statusCode).toBe(200);
            const json = response.json();
            expect(json).toBeTruthy();
            expect(json.username).toEqual(user_fixture_1.CREATE_USER_DATA.username);
        });
    });
});
//# sourceMappingURL=userRouter.test.js.map