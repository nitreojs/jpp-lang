import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { ObjectValue, Value } from '../../variables/values';

export class ObjectExpression extends Expression {
  constructor(private entries: [Value, Value][] = []) {
    super();
  }

  public add(entry: [Value, Value]) {
    this.entries.push(entry);
  }

  public eval(): Value {
    return new ObjectValue(this.entries);
  }

  public toString(): string {
    return `object {${this.entries.length !== 0 ? ` ${this.entries.map(([key, value]) => `${key} : ${value.toString()}`).join(', ')} ` : ''}}`;
  }
}

inspectable(ObjectExpression, {
  stringify(expression: ObjectExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
