export default class InvalidArgumentException extends Error {
  constructor(property: string, value: string | undefined) {
    super(`Invalid value of '${value ?? 'null'}' for property ${property}`);
  }
}
