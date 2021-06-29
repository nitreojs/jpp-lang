import { Type } from './type';
import { TokenType } from '../types';

export class UnknownType extends Type {
  constructor() {
    super('unknown', TokenType.UNKNOWN_T);
  }
}
