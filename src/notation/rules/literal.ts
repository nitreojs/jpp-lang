import { inspectable } from 'inspectable';

import { Rule } from './rule';

export class Literal extends Rule {
  constructor(private value: string | number | boolean) {
    super('literal');
  }

  public toString(): string {
    if (typeof this.value === 'boolean') {
      return String(this.value);
    }

    return this.value.toString();
  }

  public toNotation(): string {
    return `"${this.value}"`;
  }
}

inspectable(Literal, {
  stringify(literal: Literal, payload, context) {
    return `${context.stylize(literal.constructor.name, 'special')}(${context.stylize(literal.toString(), 'string')})`;
  }
});
