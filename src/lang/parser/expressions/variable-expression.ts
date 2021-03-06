import { inspectable } from 'inspectable';

import { Expression } from './expression';

import { Variables } from '../../variables';
import { Value } from '../../variables/values';
import { VariableNotDefinedError } from '../../errors';

export class VariableExpression extends Expression {
  constructor(public name: string) {
    super();
  }

  public eval(): Value {
    if (!Variables.exists(this.name)) {
      throw new VariableNotDefinedError(this.name);
    }

    return Variables.get(this.name);
  }

  public toString(): string {
    return this.name;
  }
}

inspectable(VariableExpression, {
  stringify(expression: VariableExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
