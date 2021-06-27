export class NotImplementedError extends Error {
  constructor() {
    super('not implemented');

    this.name = this.constructor.name;
  }
}