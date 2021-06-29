import { Type } from './type';
import { TokenType } from '../types';

export class VoidType extends Type {
  constructor() {
    super('void', TokenType.VOID_T);
  }
}
