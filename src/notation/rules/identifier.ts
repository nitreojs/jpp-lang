import { inspectable } from 'inspectable';

import { Rule } from './rule';

export class Identifier extends Rule {
  constructor(public name: string) {
    super('identifier');
  }

  public toString(): string {
    return this.name;
  }

  public toNotation(): string {
    return this.name;
  }
}

inspectable(Identifier, {
  stringify(identifier: Identifier, payload, context) {
    return `${context.stylize(identifier.constructor.name, 'special')}(${context.stylize(identifier.toString(), 'string')})`;
  }
});
