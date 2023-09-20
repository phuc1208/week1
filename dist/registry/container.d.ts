interface ContainerRegister<T> {
    to(factory: (...args: any) => T): void;
}
interface ContainerBind<T> {
    to(object: T): void;
}
export interface Container {
    register<T>(name: string): ContainerRegister<T>;
    bind<T>(name: string): ContainerBind<T>;
    resolve<T>(name: string): T | undefined;
}
declare const createContainer: () => Container;
export default createContainer;
