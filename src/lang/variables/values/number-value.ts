import { inspectable } from 'inspectable';

import { Value } from './value';

export class NumberValue extends Value {
  constructor(public value: number) {
    super();
  }

  public asNumber(): number {
    return this.value;
  }

  public asString(): string {
    return this.value.toString();
  }

  public toString(): string {
    return this.asNumber().toString();
  }
}

inspectable(NumberValue, {
  stringify(value: NumberValue, payload, context) {
    return `${context.stylize(value.constructor.name, 'special')}(${context.stylize(value.toString(), 'string')})`;
  }
});
