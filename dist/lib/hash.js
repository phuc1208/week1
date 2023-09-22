"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareData = exports.hashData = void 0;
const bcrypt_1 = require("bcrypt");
const hashData = async (data) => {
    const salt = await (0, bcrypt_1.genSalt)(10);
    const hashedData = await (0, bcrypt_1.hash)(data, salt);
    return hashedData;
};
exports.hashData = hashData;
const compareData = async (data, hash) => {
    const isMatch = await (0, bcrypt_1.compare)(data, hash);
    return isMatch;
};
exports.compareData = compareData;
//# sourceMappingURL=hash.js.map