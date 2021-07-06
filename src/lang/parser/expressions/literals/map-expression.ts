import { inspectable } from 'inspectable';

import { Expression } from '../expression';
import { MapValue, Value } from '../../../variables/values';

export class MapExpression extends Expression {
  private entries: [Value, Value][] = [];

  constructor(entries: [Value, Value][] = []) {
    super();

    for (const entry of entries) {
      if (this.entries.find(values => values[0].asString() === entry[0].asString())) {
        continue;
      }

      this.add(entry);
    }
  }

  public add(entry: [Value, Value]) {
    this.entries.push(entry);
  }

  public eval(): Value {
    return new MapValue(this.entries);
  }

  public toString(): string {
    return `map {${this.entries.length !== 0 ? ` ${this.entries.map(([key, value]) => `${key} : ${value.toString()}`).join(', ')} ` : ''}}`;
  }
}

inspectable(MapExpression, {
  stringify(expression: MapExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
