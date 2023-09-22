"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_USER_DATA = void 0;
const faker_1 = require("@faker-js/faker");
exports.CREATE_USER_DATA = {
    username: faker_1.faker.string.sample(),
    password: faker_1.faker.string.sample()
};
//# sourceMappingURL=user.fixture.js.map