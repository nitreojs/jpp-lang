import { Type } from './type';
import { TokenType } from '../types';

export class NumberType extends Type {
  constructor() {
    super('number', TokenType.NUMBER_T);
  }
}
