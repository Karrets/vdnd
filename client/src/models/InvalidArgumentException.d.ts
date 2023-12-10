export default class InvalidArgumentException extends Error {
    constructor(property: string, value: string | undefined);
}
