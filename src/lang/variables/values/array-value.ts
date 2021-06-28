import { inspectable } from 'inspectable';

import { Value } from './value';

export class ArrayValue extends Value {
  constructor(public values: Value[]) {
    super('array');
  }

  public asNumber(): number {
    throw new Error('cannot convert array to number');
  }

  public asString(): string {
    return this.toString();
  }

  public asBool(): boolean {
    throw new Error('cannot convert array to bool');
  }

  public toString(): string {
    return `[${this.values.join(', ')}]`;
  }
}

inspectable(ArrayValue, {
  stringify(value: ArrayValue, payload, context) {
    return `${context.stylize(value.constructor.name, 'special')}(${context.stylize(value.toString(), 'string')})`;
  }
});
