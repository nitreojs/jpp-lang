import { inspectable } from 'inspectable';

import { Rule } from './rule';

export class Plus extends Rule {
  public rules: Rule[] = [];

  constructor(...args: Rule[]) {
    super('plus');

    this.rules = args;
  }

  public toNotation(): string {
    if (this.rules.length === 1) {
      return this.rules[0].toNotation() + '+';
    }

    return `(${this.rules.map(rule => rule.toNotation()).join(' ')})+`;
  }
}

inspectable(Plus, {
  stringify(plus: Plus, payload, context) {
    return `${context.stylize(plus.constructor.name, 'special')}(${plus.rules.map(rule => context.inspect(rule)).join(', ')})`;
  }
});
