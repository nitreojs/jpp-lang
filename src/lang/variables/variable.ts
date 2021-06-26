import { inspectable } from 'inspectable';

import { VariableOptions } from '../types';
import { Value } from './values';

export class Variable {
  constructor(private options: VariableOptions) { }

  public get constant(): boolean {
    return this.options.constant ?? false;
  }

  public get name(): string {
    return this.options.name;
  }

  public get value(): Value {
    return this.options.value;
  }

  public toString(): string {
    return `${this.constant ? 'const': 'let'} ${this.name} = ${this.value}`;
  }
}

inspectable(Variable, {
  stringify(expression: Variable, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${context.stylize(expression.toString(), 'string')})`;
  }
});
