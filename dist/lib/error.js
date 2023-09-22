"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
class DomainError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = DomainError;
class BadRequestError extends DomainError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=error.js.map