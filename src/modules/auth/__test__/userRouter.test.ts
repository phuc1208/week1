import { CREATE_USER_DATA } from "./fixtures/user.fixture";
import { BadRequestError } from "@lib/error";
import { IUserService } from "@modules/auth";
import { Container } from "@registry/container";
import bootstrap from "@root";
import { FastifyInstance } from 'fastify'

describe("[TEST] UserRouter functionalities", () => {
    let _userService: IUserService;
    let server: FastifyInstance;
    let container: Container;

    beforeAll(async () => {
        const resolve = await bootstrap();
        server = resolve.fastify;
        container = resolve.container;

        _userService = container.resolve<IUserService>("userService");
    })

    afterAll(() => {
        server.close();
    })

    describe("[TEST] /auth/signup", () => {
        test("[FUNCTION] Testing POST /auth/signup endpoint with user input has existed result in bad request response", async () => {
            // arrange
            jest.spyOn(_userService, 'signUp')
                .mockImplementation(() => Promise.reject(new BadRequestError("something bad")));
            // act and assert
            const response = await server.inject({
                method: "POST",
                url: "/auth/signup",
                payload: CREATE_USER_DATA
            })

            expect(response.statusCode).toBe(400);
            const json = response.json();
            expect(json.error).toBeTruthy();
        })

        test("[FUNCTION] Testing POST /auth/signup endpoint with user input does not exist result in ok response", async () => {
            // arrange
            jest.spyOn(_userService, 'signUp')
                .mockImplementation(() => Promise.resolve(CREATE_USER_DATA));
            // act and assert
            const response = await server.inject({
                method: "POST",
                url: "/auth/signup",
                payload: CREATE_USER_DATA
            })

            expect(response.statusCode).toBe(200);
            const json = response.json();
            expect(json).toBeTruthy();
            expect(json).toEqual(CREATE_USER_DATA);
        })
    })

    describe("[TEST] /auth/login", () => {
        test("[FUNCTION] Testing POST /auth/login endpoint with user input has existed result in bad request response", async () => {
            // arrange
            jest.spyOn(_userService, 'login')
                .mockImplementation(() => Promise.reject(new BadRequestError("something bad")));
            // act and assert
            const response = await server.inject({
                method: "POST",
                url: "/auth/login",
                payload: CREATE_USER_DATA
            })

            expect(response.statusCode).toBe(400);
            const json = response.json();
            expect(json.error).toBeTruthy();
        })

        test("[FUNCTION] Testing POST /auth/login endpoint with user input does not exist result in ok response", async () => {
            // arrange
            jest.spyOn(_userService, 'login')
                .mockImplementation(() => Promise.resolve({
                    username: CREATE_USER_DATA.username,
                    accessToken: "",
                    refreshToken: ""
                }));
            // act and assert
            const response = await server.inject({
                method: "POST",
                url: "/auth/login",
                payload: CREATE_USER_DATA
            })

            expect(response.statusCode).toBe(200);
            const json = response.json();
            expect(json).toBeTruthy();
            expect(json.username).toEqual(CREATE_USER_DATA.username);
        })
    })
});