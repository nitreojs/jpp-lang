import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { NumberValue, Value } from '../../variables/values';

export class PercentExpression extends Expression {
  constructor(private expression: Expression) {
    super();
  }

  public eval(): Value {
    return new NumberValue(this.expression.eval().asNumber() / 100);
  }

  public toString(): string {
    return `${this.expression.toString()}%`;
  }
}

inspectable(PercentExpression, {
  stringify(expression: PercentExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
