import { FastifyPluginCallback } from 'fastify';
import { IUserService } from "./userService";
export interface UserRouter {
}
declare const userRouter: (userService: IUserService) => FastifyPluginCallback<UserRouter>;
export default userRouter;
