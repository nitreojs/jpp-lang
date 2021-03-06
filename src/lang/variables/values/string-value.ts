import { inspectable } from 'inspectable';

import { Value } from './value';
import { InternalError } from '../../errors';

export class StringValue extends Value {
  constructor(public value: string) {
    super('string');
  }

  public asNumber(): number {
    const number = Number.parseInt(this.value);

    if (Number.isNaN(number)) {
      throw new InternalError('cannot convert string to number');
    }

    return number;
  }

  public asString(): string {
    return this.value;
  }

  public asBool(): boolean {
    return this.value !== '';
  }

  public toString(): string {
    return `"${this.asString()}"`;
  }
}

inspectable(StringValue, {
  stringify(value: StringValue, payload, context) {
    return `${context.stylize(value.constructor.name, 'special')}(${context.stylize(value.toString(), 'string')})`;
  }
});
