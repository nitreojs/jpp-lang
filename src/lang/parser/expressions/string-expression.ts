import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { StringValue, Value } from '../../variables/values';

export class StringExpression extends Expression {
  constructor(private value: string) {
    super();
  }

  public eval(): Value {
    return new StringValue(this.value);
  }

  public toString(): string {
    return `"${this.value}"`;
  }
}

inspectable(StringExpression, {
  stringify(expression: StringExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.eval()})`;
  }
});
