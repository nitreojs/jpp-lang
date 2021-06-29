import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { TypeValue, Value } from '../../variables/values';
import { getType } from '../../utils/helpers';

export class TypeOperatorExpression extends Expression {
  constructor(private expression: Expression) {
    super();
  }

  public eval(): Value {
    return new TypeValue(getType(this.expression.eval().type));
  }

  public toString(): string {
    return `type ${this.expression.toString()}`;
  }
}

inspectable(TypeOperatorExpression, {
  stringify(expression: TypeOperatorExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
