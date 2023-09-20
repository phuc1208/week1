import { FastifyPluginCallback } from 'fastify';
import { IUserService } from "./userService.js";
import User, { schema } from './user.js';

export interface UserRouter { }
const userRouter = (userService: IUserService) => {
    //TODO: validate req.body.username is email
    const _userRouter: FastifyPluginCallback<UserRouter> = async (instance, opts) => {
        instance.post<{ Body: User }>("/signup", {
            async handler(req, reply) {
                const user = await userService.signUp(req.body);
                reply.send(user);
            },
            schema: {
                body: schema
            }
        })

        instance.post<{ Body: User }>("/login", {
            async handler(req, reply) {
                const data = await userService.login(req.body);
                reply.send(data);
            },
            schema: {
                body: schema
            }
        })
    }

    return _userRouter;
}

export default userRouter;