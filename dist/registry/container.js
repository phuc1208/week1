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
    const result = {
        register(name) {
            const recordType = records[name];
            if (recordType) {
                throw new Error(`Type ${name} has registed`);
            }
            const result = {
                to(factory) {
                    records[name] = factory;
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
            return result;
        },
    };
    return result;
};
export default createContainer;
//# sourceMappingURL=container.js.map