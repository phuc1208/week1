"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.schema = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
    password: typebox_1.Type.String()
});
//# sourceMappingURL=user.js.map