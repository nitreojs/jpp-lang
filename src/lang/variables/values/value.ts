import { InternalError } from '../../errors';

export class Value {
  constructor(public type: string) { }

  public asNumber(): number {
    throw new InternalError('not implemented');
  }

  public asString(): string {
    throw new InternalError('not implemented');
  }

  public asBool(): boolean {
    throw new InternalError('not implemented');
  }
}
