"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_fixture_1 = require("./fixtures/user.fixture");
const error_1 = require("@lib/error");
const auth_1 = require("@modules/auth");
describe("[TEST] UserService functionalities", () => {
    let _userService;
    let _userRepo;
    let _tokenGenerator;
    beforeAll(() => {
        _userRepo = {
            find: jest.fn((user) => Promise.resolve(user)),
            create: jest.fn((user) => Promise.resolve(user))
        };
        _tokenGenerator = {
            signToken: jest.fn(() => Promise.resolve({
                accessToken: "",
                refreshToken: ""
            })),
            verifyToken: jest.fn(() => Promise.resolve(null))
        };
    });
    describe("[TEST SIGNUP] Testing signup function", () => {
        test("[FUNCTION] testing sign up function while user input has existed result in throw error", async () => {
            jest.spyOn(_userRepo, 'find')
                .mockImplementation(jest.fn(() => Promise.resolve(user_fixture_1.CREATE_USER_DATA)));
            _userService = (0, auth_1.userService)(_userRepo, _tokenGenerator);
            await expect(_userService.signUp(user_fixture_1.CREATE_USER_DATA)).rejects
                .toThrowError(error_1.BadRequestError);
        });
        test("[FUNCTION] testing sign up function while user input does not exist result in successful case", async () => {
            jest.spyOn(_userRepo, 'find')
                .mockImplementation(() => Promise.resolve(undefined));
            _userService = (0, auth_1.userService)(_userRepo, _tokenGenerator);
            const user = await _userService.signUp(user_fixture_1.CREATE_USER_DATA);
            expect(_userRepo.create).toHaveBeenCalled();
            expect(user).toBeTruthy();
            expect(user.username).toEqual(user_fixture_1.CREATE_USER_DATA.username);
        });
    });
    describe("[TEST LOGIN] Testing login function", () => {
        test("[FUNCTION] Testing login function while user does not exist result in throw error", async () => {
            jest.spyOn(_userRepo, 'find')
                .mockImplementation(() => Promise.resolve(undefined));
            _userService = (0, auth_1.userService)(_userRepo, _tokenGenerator);
            await expect(_userService.login(user_fixture_1.CREATE_USER_DATA)).rejects
                .toThrowError(error_1.BadRequestError);
        });
        test("[FUNCTION] Testing login function while user has existed but password does not match result in throw error", async () => {
            jest.spyOn(_userRepo, 'find')
                .mockImplementation(() => Promise.resolve(user_fixture_1.CREATE_USER_DATA));
            jest.spyOn(await Promise.resolve().then(() => __importStar(require('@lib/hash'))), 'compareData')
                .mockImplementation(() => Promise.resolve(false));
            _userService = (0, auth_1.userService)(_userRepo, _tokenGenerator);
            await expect(_userService.login(user_fixture_1.CREATE_USER_DATA)).rejects
                .toThrowError(error_1.BadRequestError);
        });
        test("[FUNCTION] Testing login function while username and password are correct result in successful case", async () => {
            jest.spyOn(_userRepo, 'find')
                .mockImplementation(() => Promise.resolve(user_fixture_1.CREATE_USER_DATA));
            jest.spyOn(await Promise.resolve().then(() => __importStar(require('@lib/hash'))), 'compareData')
                .mockImplementation(() => Promise.resolve(true));
            _userService = (0, auth_1.userService)(_userRepo, _tokenGenerator);
            const user = await _userService.login(user_fixture_1.CREATE_USER_DATA);
            expect(_tokenGenerator.signToken).toHaveBeenCalled();
            expect(user).toBeTruthy();
            expect(user.username).toEqual(user_fixture_1.CREATE_USER_DATA.username);
        });
    });
});
//# sourceMappingURL=userService.test.js.map