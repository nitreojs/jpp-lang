import { inspectable } from 'inspectable';

import { Rule } from './rule';

export class Star extends Rule {
  public rules: Rule[] = [];

  constructor(...args: Rule[]) {
    super('star');

    this.rules = args;
  }

  public toNotation(): string {
    if (this.rules.length === 1) {
      return this.rules[0].toNotation() + '*';
    }

    return `(${this.rules.map(rule => rule.toNotation()).join(' ')})*`;
  }
}

inspectable(Star, {
  stringify(star: Star, payload, context) {
    return `${context.stylize(star.constructor.name, 'special')}(${star.rules.map(rule => context.inspect(rule)).join(', ')})`;
  }
});
