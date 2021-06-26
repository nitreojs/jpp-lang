import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { NumberValue, Value } from '../../variables/values';

export class NumberExpression extends Expression {
  constructor(private value: number) {
    super();
  }

  public eval(): Value {
    return new NumberValue(this.value);
  }

  public toString(): string {
    return this.value.toString();
  }
}

inspectable(NumberExpression, {
  stringify(expression: NumberExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.eval()}) ${context.inspect(payload)}`;
  },

  serialize(expression: NumberExpression) {
    return {};
  }
});
