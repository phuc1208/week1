import { FastifyInstance, FastifyPluginCallback } from "fastify";

interface ContainerRegister<T> {
    to(factory: (...args: any) => T, opts?: {
        prefix: string
    }): void,
}

interface ContainerBind<T> {
    to(object: T): void
}

function getArgumentNames(func: (...args: any[]) => void): string[] {
    const funcString = func.toString();
    const argNames = funcString.slice(funcString.indexOf('(') + 1, funcString.indexOf(')')).match(/([^\s,]+)/g);
    return argNames || [];
}

function getArgumentType(func: (...args: any[]) => any): string[] {
    const funcString = func.toString();
    const args = funcString.slice(funcString.indexOf('(') + 1, funcString.indexOf(')'));

    const result = []
    const pattern = /(\w+):\s+(\w+)/g;
    let match;
    while ((match = pattern.exec(args)) !== null) {
        const argType = match[2];
        result.push(argType);
    }


    return result;
}

export interface Container {
    register<T>(name: string): ContainerRegister<T>,
    bind<T>(name: string): ContainerBind<T>,
    resolve<T>(name: string): T | undefined,
    unbind<T>(name: string): void,
    loadRoutes(fastify: FastifyInstance): void
}

const createContainer = (): Container => {
    const records: {
        [x: string]: (...args: any) => any
    } = {};
    const objectRecords: {
        [x: string]: any
    } = {}
    const prefixs: {
        [x: string]: string
    } = {}

    const result = {
        register<T>(name: string): ContainerRegister<T> {
            const recordType = records[name];
            if (recordType) {
                throw new Error(`Type ${name} has registed`);
            }

            const result = {
                to(factory: (...args: any) => T, opts?: { prefix: string }): void {
                    records[name] = factory;
                    if (opts) {
                        prefixs[name] = opts.prefix;
                    }
                }
            }

            return result;
        },
        bind<T>(name: string): ContainerBind<T> {
            const recordType = objectRecords[name];
            if (recordType) {
                throw new Error(`Type ${name} has registed`);
            }

            const result = {
                to(object: T): void {
                    objectRecords[name] = object;
                }
            }

            return result;
        },
        resolve<T>(name: string): T | undefined {
            // TODO: resolve object type T on records
            const object = objectRecords[name];
            if (object) {
                return object;
            }

            const factory = records[name];
            if (!factory) {
                return undefined
            }

            const args = getArgumentNames(factory);
            const dependencies = args.map(arg => (this.resolve(arg)));

            const result = factory(...dependencies);

            // cache dependency
            objectRecords[name] = result;

            return result;
        },
        unbind<T>(name: string): void {
            const factory = records[name];
            const object = objectRecords[name];

            if (!factory && !object) {
                throw new Error(`Type ${name} does not exist`);
            }

            if (factory) {
                delete records[name];
            }

            if (object) {
                delete objectRecords[name];
            }
        },
        loadRoutes(fastify: FastifyInstance) {
            Object.keys(records).forEach((name: string) => {
                if (name.includes("Router")) {
                    fastify.register(this.resolve(name), { prefix: prefixs[name] });
                }
            })
        }
    }

    return result;
}

export default createContainer;