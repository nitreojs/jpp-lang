export class Rule {
  constructor(public id: string) { }

  public toString(): string {
    throw new Error('not implemented');
  }
  
  public toNotation(): string {
    throw new Error('not implemented');
  }
}
