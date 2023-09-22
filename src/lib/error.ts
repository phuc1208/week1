export default class DomainError extends Error {
    public code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

export class BadRequestError extends DomainError {

    constructor(message: string) {
        super(message, 400);
    }
}