import { inspectable } from 'inspectable';

import { Value } from './value';

export class BoolValue extends Value {
  constructor(public value: boolean) {
    super('bool');
  }

  public asNumber(): number {
    return this.value ? 1 : 0;
  }

  public asString(): string {
    return this.value ? 'true' : 'false';
  }

  public asBool(): boolean {
    return this.value;
  }

  public toString(): string {
    return this.asString();
  }
}

inspectable(BoolValue, {
  stringify(value: BoolValue, payload, context) {
    return `${context.stylize(value.constructor.name, 'special')}(${context.stylize(value.toString(), 'string')})`;
  }
});
