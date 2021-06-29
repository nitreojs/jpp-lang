import { Type } from './type';
import { TokenType } from '../types';

export class ArrayType extends Type {
  constructor() {
    super('array', TokenType.ARRAY_T);
  }
}
