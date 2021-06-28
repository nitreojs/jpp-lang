import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { Value } from '../../variables/values';

export class ParenthesisExpression extends Expression {
  constructor(public expression: Expression) {
    super();
  }

  public eval(): Value {
    return this.expression.eval();
  }

  public toString(): string {
    return `(${this.expression.toString()})`;
  }
}

inspectable(ParenthesisExpression, {
  stringify(expression: ParenthesisExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}${expression.toString()}`;
  }
});
