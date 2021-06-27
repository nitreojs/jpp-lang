export class ZeroDivisionError extends Error {
  constructor() {
    super('cannot divide by 0');

    this.name = this.constructor.name;
  }
}
