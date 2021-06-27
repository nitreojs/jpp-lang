export class VariableNotDefinedError extends Error {
  constructor(name: string) {
    super(`variable '${name}' is not defined`);

    this.name = this.constructor.name;
  }
}