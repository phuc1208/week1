"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getArgumentNames(func) {
    const funcString = func.toString();
    const argNames = funcString.slice(funcString.indexOf('(') + 1, funcString.indexOf(')')).match(/([^\s,]+)/g);
    return argNames || [];
}
function getArgumentType(func) {
    const funcString = func.toString();
    const args = funcString.slice(funcString.indexOf('(') + 1, funcString.indexOf(')'));
    const result = [];
    const pattern = /(\w+):\s+(\w+)/g;
    let match;
    while ((match = pattern.exec(args)) !== null) {
        const argType = match[2];
        result.push(argType);
    }
    return result;
}
const createContainer = () => {
    const records = {};
    const objectRecords = {};
    const prefixs = {};
    const result = {
        register(name) {
            const recordType = records[name];
            if (recordType) {
                throw new Error(`Type ${name} has registed`);
            }
            const result = {
                to(factory, opts) {
                    records[name] = factory;
                    if (opts) {
                        prefixs[name] = opts.prefix;
                    }
                }
            };
            return result;
        },
        bind(name) {
            const recordType = objectRecords[name];
            if (recordType) {
                throw new Error(`Type ${name} has registed`);
            }
            const result = {
                to(object) {
                    objectRecords[name] = object;
                }
            };
            return result;
        },
        resolve(name) {
            const object = objectRecords[name];
            if (object) {
                return object;
            }
            const factory = records[name];
            if (!factory) {
                return undefined;
            }
            const args = getArgumentNames(factory);
            const dependencies = args.map(arg => (this.resolve(arg)));
            const result = factory(...dependencies);
            objectRecords[name] = result;
            return result;
        },
        unbind(name) {
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
        loadRoutes(fastify) {
            Object.keys(records).forEach((name) => {
                if (name.includes("Router")) {
                    fastify.register(this.resolve(name), { prefix: prefixs[name] });
                }
            });
        }
    };
    return result;
};
exports.default = createContainer;
//# sourceMappingURL=container.js.map