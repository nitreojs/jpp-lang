import { inspectable } from 'inspectable';

import { Value } from './value';

export class NullValue extends Value {
  constructor() {
    super();
  }

  public asNumber(): number {
    return 0;
  }

  public asString(): string {
    return 'null';
  }

  public asBool(): boolean {
    return false;
  }

  public toString(): string {
    return this.asString();
  }
}

inspectable(NullValue, {
  stringify(value: NullValue, payload, context) {
    return `${context.stylize(value.constructor.name, 'special')}(${context.stylize(value.toString(), 'string')})`;
  }
});
