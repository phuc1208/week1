import { schema } from './user.js';
const userRouter = (userService) => {
    const _userRouter = async (instance, opts) => {
        instance.post("/signup", {
            async handler(req, reply) {
                const user = await userService.signUp(req.body);
                reply.send(user);
            },
            schema: {
                body: schema
            }
        });
        instance.post("/login", {
            async handler(req, reply) {
                const data = await userService.login(req.body);
                reply.send(data);
            },
            schema: {
                body: schema
            }
        });
    };
    return _userRouter;
};
export default userRouter;
//# sourceMappingURL=userRouter.js.map