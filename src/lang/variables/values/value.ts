export class Value {
  constructor(public type: string) { }

  public asNumber(): number {
    throw new Error('not implemented');
  }

  public asString(): string {
    throw new Error('not implemented');
  }

  public asBool(): boolean {
    throw new Error('not implemented');
  }
}
