import { inspectable } from 'inspectable';

import { Value } from './value';

export class ObjectValue extends Value {
  constructor(public entries: [Value, Value][]) {
    super('object');
  }

  public asNumber(): number {
    throw new Error('cannot convert object to number');
  }

  public asString(): string {
    return this.toString();
  }

  public asBool(): boolean {
    throw new Error('cannot convert object to bool');
  }

  public toString(): string {
    return `object {${this.entries.length !== 0 ? ` ${this.entries.map(([key, value]) => `${key} : ${value.toString()}`)} ` : ''}}`;
  }
}

inspectable(ObjectValue, {
  stringify(value: ObjectValue, payload, context) {
    return `${context.stylize(value.constructor.name, 'special')}(${context.stylize(value.toString(), 'string')})`;
  }
});
