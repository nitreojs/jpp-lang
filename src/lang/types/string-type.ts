import { Type } from './type';
import { TokenType } from '../types';

export class StringType extends Type {
  constructor() {
    super('string', TokenType.STRING_T);
  }
}
