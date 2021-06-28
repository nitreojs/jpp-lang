import { InternalError } from '../../lang/errors';

export class Rule {
  constructor(public id: string) { }

  public toString(): string {
    throw new InternalError('not implemented');
  }
  
  public toNotation(): string {
    throw new InternalError('not implemented');
  }
}
