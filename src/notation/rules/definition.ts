import { inspectable } from 'inspectable';

import { Rule } from './rule';

export class Definition extends Rule {
  constructor(public name: string, public rule: Rule) {
    super('definition');

    if (!new.target) {
      return new Definition(name, rule);
    }
  }

  public toNotation(): string {
    return `${this.name} = ${this.rule.toNotation()};`;
  }
}

inspectable(Definition, {
  stringify(definition: Definition, payload, context) {
    return `${context.stylize(definition.constructor.name, 'special')}(${context.stylize(definition.name, 'string')}, ${context.inspect(definition.rule)})`;
  }
});
