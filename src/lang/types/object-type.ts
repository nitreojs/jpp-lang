import { Type } from './type';
import { TokenType } from '../types';

export class ObjectType extends Type {
  constructor() {
    super('object', TokenType.OBJECT_T);
  }
}
