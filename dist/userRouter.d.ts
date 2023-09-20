import { FastifyPluginCallback } from 'fastify';
import { IUserService } from "./userService.js";
export interface UserRouter {
}
declare const userRouter: (userService: IUserService) => FastifyPluginCallback<UserRouter>;
export default userRouter;
