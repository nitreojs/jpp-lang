import { inspectable } from 'inspectable';

import { Rule } from './rule';

export class Set extends Rule {
  public rules: Rule[] = [];

  constructor(...args: Rule[]) {
    super('set');

    this.rules = args;
  }

  public toNotation(): string {
    return this.rules.map(rule => rule.toNotation()).join(' ');
  }
}

inspectable(Set, {
  stringify(set: Set, payload, context) {
    return `${context.stylize(set.constructor.name, 'special')}(${set.rules.map(rule => context.inspect(rule)).join(', ')})`;
  }
});
