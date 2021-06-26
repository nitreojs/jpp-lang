import { inspectable } from 'inspectable';
import { Rule } from './rule';

export class Or extends Rule {
  public rules: Rule[] = [];

  constructor(...args: Rule[]) {
    super('or');

    this.rules = args;
  }

  public toString(): string {
    return this.rules.join(', ');
  }

  public toNotation(): string {
    return `(${this.rules.map(rule => rule.toNotation()).join(' | ')})`;
  }
}

inspectable(Or, {
  stringify(or: Or, payload, context) {
    return `${context.stylize(or.constructor.name, 'special')}(${or.rules.map(rule => context.inspect(rule)).join(', ')})`;
  }
});
