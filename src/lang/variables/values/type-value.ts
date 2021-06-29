import { inspectable } from 'inspectable';

import { Value } from './value';
import { Type } from '../../types/';
import { InternalError } from '../../errors';

export class TypeValue extends Value {
  constructor(public _type: Type) {
    super('bool');
  }

  public asNumber(): number {
    throw new InternalError('cannot convert type to number');
  }

  public asString(): string {
    return this._type.toString();
  }

  public asBool(): boolean {
    throw new InternalError('cannot convert type to bool');
  }

  public toString(): string {
    return this.asString();
  }
}

inspectable(TypeValue, {
  stringify(value: TypeValue, payload, context) {
    return `${context.stylize(value.constructor.name, 'special')}(${context.stylize(value.toString(), 'string')})`;
  }
});
