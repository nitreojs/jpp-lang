import { Type } from './type';
import { TokenType } from '../types';

export class BoolType extends Type {
  constructor() {
    super('bool', TokenType.BOOL_T);
  }
}
