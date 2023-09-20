export default class DomainError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
export class BadRequestError extends DomainError {
    constructor(message) {
        super(message, 400);
    }
}
//# sourceMappingURL=error.js.map