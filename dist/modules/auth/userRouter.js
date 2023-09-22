"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const userRouter = (userService) => {
    const _userRouter = async (instance, opts, done) => {
        instance.post("/signup", {
            async handler(req, reply) {
                const user = await userService.signUp(req.body);
                reply.send(user);
            },
            schema: {
                body: user_1.schema
            }
        });
        instance.post("/login", {
            async handler(req, reply) {
                const data = await userService.login(req.body);
                reply.send(data);
            },
            schema: {
                body: user_1.schema
            }
        });
        done();
    };
    return _userRouter;
};
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map