import { inspectable } from 'inspectable';

import { NumberValue, Value } from '../../variables/values';

export class Expression {
  public eval(): Value {
    return new NumberValue(0);
  }
}

inspectable(Expression, {
  stringify(expression: Expression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.eval()}) ${context.inspect(payload)}`;
  },

  serialize(expression: Expression) {
    return {};
  }
});
