import { TokenType } from '../types';

export class Type {
  constructor(public id: string, public token: TokenType) { }

  public toString(): string {
    return this.id;
  }
}
