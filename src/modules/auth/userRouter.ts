import { FastifyPluginCallback } from 'fastify';
import { IUserService } from "./userService";
import User, { schema } from './user';

export interface UserRouter { }
const userRouter = (userService: IUserService) => {
    //TODO: validate req.body.username is email

    const _userRouter: FastifyPluginCallback<UserRouter> = async (instance, opts, done) => {
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

        done();
    }

    return _userRouter;
}

export default userRouter;