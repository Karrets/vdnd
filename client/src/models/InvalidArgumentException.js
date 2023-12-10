export default class InvalidArgumentException extends Error {
    constructor(property, value) {
        super(`Invalid value of '${value ?? 'null'}' for property ${property}`);
    }
}
