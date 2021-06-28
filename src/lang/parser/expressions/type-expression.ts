import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { StringValue, Value } from '../../variables/values';

export class TypeExpression extends Expression {
  constructor(private expression: Expression) {
    super();
  }

  public eval(): Value {
    return new StringValue(this.expression.eval().type);
  }

  public toString(): string {
    return this.expression.toString();
  }
}

inspectable(TypeExpression, {
  stringify(expression: TypeExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
