import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { ArrayValue, Value } from '../../variables/values';

export class ArrayExpression extends Expression {
  constructor(private values: Value[] = []) {
    super();
  }

  public add(value: Value) {
    this.values.push(value);
  }

  public eval(): Value {
    return new ArrayValue(this.values);
  }

  public toString(): string {
    return `[${this.values.join(', ')}]`;
  }
}

inspectable(ArrayExpression, {
  stringify(expression: ArrayExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
