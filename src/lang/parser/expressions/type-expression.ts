import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { TypeValue, Value } from '../../variables/values';
import { Type } from '../../types/';

export class TypeExpression extends Expression {
  constructor(public type: Type) {
    super();
  }

  public eval(): Value {
    return new TypeValue(this.type);
  }

  public toString(): string {
    return this.type.toString();
  }
}

inspectable(TypeExpression, {
  stringify(expression: TypeExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${context.stylize(expression.toString(), 'string')})`;
  }
});
