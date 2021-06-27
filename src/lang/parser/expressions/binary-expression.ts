import { inspectable } from 'inspectable';

import { Expression } from './expression';

import { TokenType } from '../../types';
import { getTokenChar } from '../../utils/helpers';
import { NumberValue, StringValue, Value } from '../../variables/values';

export class BinaryExpression extends Expression {
  constructor(
    public left: Expression,
    public operator: TokenType,
    public right: Expression
  ) {
    super();
  }

  public eval(): Value {
    const leftVal: Value = this.left.eval();
    const rightVal: Value = this.right.eval();

    if (leftVal instanceof StringValue) {
      if (!(rightVal instanceof StringValue)) {
        throw new TypeError('expected right side to be string');
      }

      if (this.operator === TokenType.PLUS) {
        return new StringValue(leftVal.asString() + rightVal.asString());
      }

      throw new Error(`unknown operator '${this.operator}' for string`);
    }

    if (leftVal instanceof NumberValue) {
      if (!(rightVal instanceof NumberValue)) {
        throw new TypeError('expected right side to be number');
      }

      if (this.operator === TokenType.PLUS) {
        return new NumberValue(leftVal.asNumber() + rightVal.asNumber());
      }
  
      if (this.operator === TokenType.MINUS) {
        return new NumberValue(leftVal.asNumber() - rightVal.asNumber());
      }
  
      if (this.operator === TokenType.ASTERISK) {
        return new NumberValue(leftVal.asNumber() * rightVal.asNumber());
      }
  
      if (this.operator === TokenType.SLASH) {
        return new NumberValue(leftVal.asNumber() / rightVal.asNumber());
      }
    }

    return new NumberValue(0);
  }

  public toString(): string {
    return `${this.left.toString()} ${getTokenChar(this.operator)} ${this.right.toString()}`;
  }
}

inspectable(BinaryExpression, {
  stringify(expression: BinaryExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()}) ${context.inspect(payload)}`;
  },

  serialize(expression: BinaryExpression) {
    return {
      left: expression.left,
      operator: expression.operator,
      right: expression.right
    };
  }
});
