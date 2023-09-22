export default class DomainError extends Error {
    code: number;
    constructor(message: string, code: number);
}
export declare class BadRequestError extends DomainError {
    constructor(message: string);
}
