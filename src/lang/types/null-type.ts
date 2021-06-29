import { Type } from './type';
import { TokenType } from '../types';

export class NullType extends Type {
  constructor() {
    super('null', TokenType.NULL_T);
  }
}
