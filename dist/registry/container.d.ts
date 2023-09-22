import { FastifyInstance } from "fastify";
interface ContainerRegister<T> {
    to(factory: (...args: any) => T, opts?: {
        prefix: string;
    }): void;
}
interface ContainerBind<T> {
    to(object: T): void;
}
export interface Container {
    register<T>(name: string): ContainerRegister<T>;
    bind<T>(name: string): ContainerBind<T>;
    resolve<T>(name: string): T | undefined;
    unbind<T>(name: string): void;
    loadRoutes(fastify: FastifyInstance): void;
}
declare const createContainer: () => Container;
export default createContainer;
