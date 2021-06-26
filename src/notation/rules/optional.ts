import { inspectable } from 'inspectable';

import { Rule } from './rule';

export class Optional extends Rule {
  public rules: Rule[] = [];

  constructor(...args: Rule[]) {
    super('optional');

    this.rules = args;
  }

  public toNotation(): string {
    if (this.rules.length === 1) {
      return this.rules[0].toNotation() + '?';
    }

    return `[${this.rules.map(rule => rule.toNotation()).join(' ')}]`;
  }
}

inspectable(Optional, {
  stringify(optional: Optional, payload, context) {
    return `${context.stylize(optional.constructor.name, 'special')}(${optional.rules.map(rule => context.inspect(rule)).join(', ')})`;
  }
});
