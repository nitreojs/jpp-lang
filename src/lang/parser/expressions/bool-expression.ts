import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { BoolValue, Value } from '../../variables/values';

export class BoolExpression extends Expression {
  constructor(private value: boolean) {
    super();
  }

  public eval(): Value {
    return new BoolValue(this.value);
  }

  public toString(): string {
    return this.value.toString();
  }
}

inspectable(BoolExpression, {
  stringify(expression: BoolExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.eval()}) ${context.inspect(payload)}`;
  },

  serialize(expression: BoolExpression) {
    return {};
  }
});
