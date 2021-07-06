import { inspectable } from 'inspectable';

import { Value } from './value';

export class MapValue extends Value {
  constructor(public entries: [Value, Value][]) {
    super('map');
  }

  public asNumber(): number {
    return this.entries.length;
  }

  public asString(): string {
    return this.toString();
  }

  public asBool(): boolean {
    return this.asNumber() > 0;
  }

  public toString(): string {
    return `map {${this.entries.length !== 0 ? ` ${this.entries.map(([key, value]) => `${key} : ${value.toString()}`).join(', ')} ` : ''}}`;
  }
}

inspectable(MapValue, {
  stringify(value: MapValue, payload, context) {
    return `${context.stylize(value.constructor.name, 'special')}(${context.stylize(value.toString(), 'string')})`;
  }
});
